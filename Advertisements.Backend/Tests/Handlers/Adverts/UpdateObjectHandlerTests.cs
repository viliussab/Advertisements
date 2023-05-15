using Commands.Handlers.Adverts.UpdateObject;
using Commands.Requests;
using Core.Database;
using Core.EnumsRequest;
using Core.Models;
using Tests.Abstractions;

namespace Tests.Handlers.Adverts;

[TestFixture]
public class UpdateObjectHandlerTests
{
    private UpdateObjectHandler _handler;
    private AdvertContext _dbContext;
    private UpdateObjectValidator _validator;

    [SetUp]
    public void Setup()
    {
        _dbContext = DbContextFactory.Create();
        _validator = new UpdateObjectValidator();
        _handler = new UpdateObjectHandler(_validator, _dbContext);
    }
    
    [TearDown]
    public void Teardown()
    {
        _dbContext.Database.EnsureDeleted();
    }

    [Test] 
    public async Task Handle_ShouldUpdateObjectFields()
    {
        // Arrange
        var obj = await SeedObjectAsync();
        var command = BuildCommandBase(obj);
        command.Address = "4";

        // Act
        await _handler.Handle(command, CancellationToken.None);
        var result = _dbContext.Set<AdvertObject>().First();
		
        // Assert
        result.Address.Should().Be("4");
    }
    
    [Test] 
    public async Task Handle_ShouldUpdateAdvertPlaneFields_WhenPlaneIsSetToEdit()
    {
        // Arrange
        var obj = await SeedObjectAsync();
        var command = BuildCommandBase(obj);
        var plane = command.Planes.First();
        plane.PartialName = "4";
        command.Planes = new List<UpdateObjectCommand.UpdatePlane>() { plane };

        // Act
        var answer = await _handler.Handle(command, CancellationToken.None);
        var result = _dbContext.Set<AdvertPlane>().First();
		
        // Assert
        result.PartialName.Should().Be("4");
    }
    
    [Test] 
    public async Task Handle_ShouldCreateAdditionalAdvertPlane_WhenPlaneIsSetToCreate()
    {
        // Arrange
        var obj = await SeedObjectAsync();
        var command = BuildCommandBase(obj);
        command.Planes.Add(new UpdateObjectCommand.UpdatePlane
        {
            PartialName = "Test",
            IsPermitted = false,
            IsPremium = false,
            PermissionExpiryDate = null,
            UpdateStatus = UpdateStatus.New,
        });

        // Act
        await _handler.Handle(command, CancellationToken.None);
        var result = _dbContext.Set<AdvertPlane>().ToList();
		
        // Assert
        result.Count.Should().Be(command.Planes.Count);
    }
    
    [Test] 
    public async Task Handle_ShouldDeleteExistingAdvertPlane_WhenPlaneIsSetToDelete()
    {
        // Arrange
        var obj = await SeedObjectAsync();
        var command = BuildCommandBase(obj);
        var plane = command.Planes.First();
        plane.UpdateStatus = UpdateStatus.Deleted;
        command.Planes = new List<UpdateObjectCommand.UpdatePlane>() { plane };
        // Act
        await _handler.Handle(command, CancellationToken.None);
        var result = _dbContext.Set<AdvertPlane>().FirstOrDefault();
		
        // Assert
        result.Should().BeNull();
    }
    
    [Test] 
    public async Task Handle_ShouldCreatePhotoOfAdvertPlane_WhenPlanePhotoIsSetToCreate()
    {
        // Arrange
        var obj = await SeedObjectAsync();
        var command = BuildCommandBase(obj);
        var plane = command.Planes.First();
        plane.Photos.Add(new UpdateFileRequest
        {
            Mime = "image/png",
            Base64 = "",
            Name = "test.png",
            UpdateStatus = UpdateStatus.New,
        });
        command.Planes = new List<UpdateObjectCommand.UpdatePlane>() { plane };
        // Act
        await _handler.Handle(command, CancellationToken.None);
        var result = _dbContext.Set<PlanePhoto>().ToList();
		
        // Assert
        result.Count.Should().Be(2);
    }

    [Test] 
    public async Task Handle_ShouldDeletePhotoOfAdvertPlane_WhenPlanePhotoIsSetToDelete()
    {
        // Arrange
        var obj = await SeedObjectAsync();
        var command = BuildCommandBase(obj);
        var plane = command.Planes.First();
        var photo = plane.Photos.First();
        photo.UpdateStatus = UpdateStatus.Deleted;
        plane.Photos = new List<UpdateFileRequest>() { photo };
        command.Planes = new List<UpdateObjectCommand.UpdatePlane>() { plane };
        // Act
        await _handler.Handle(command, CancellationToken.None);
        var result = _dbContext.Set<PlanePhoto>().FirstOrDefault();
		
        // Assert
        result.Should().BeNull();
    }

    private UpdateObjectCommand BuildCommandBase(AdvertObject advertObject)
    {
        var plane = advertObject.Planes.First();
        var photo = plane.Photos.First();

        return new UpdateObjectCommand
        {
            Id = advertObject.Id,
            SerialCode = advertObject.SerialCode,
            AreaId = advertObject.AreaId,
            TypeId = advertObject.TypeId,
            Name = advertObject.Name,
            Address = advertObject.Address,
            Region = advertObject.Region,
            Longitude = advertObject.Longitude,
            Latitude = advertObject.Latitude,
            Illuminated = advertObject.Illuminated,
            Planes = new List<UpdateObjectCommand.UpdatePlane>()
            {
                new UpdateObjectCommand.UpdatePlane
                {
                    Id = plane.Id,
                    PartialName = plane.PartialName,
                    IsPermitted = plane.IsPermitted,
                    IsPremium = plane.IsPremium,
                    PermissionExpiryDate = new DateTime(),
                    UpdateStatus = UpdateStatus.Existing,
                    Photos = new List<UpdateFileRequest>
                    {
                        new UpdateFileRequest
                        {
                            Mime = photo.Mime,
                            Base64 = "",
                            Name = photo.Name,
                            Id = photo.Id,
                            UpdateStatus = UpdateStatus.Existing,
                        }
                    }
                }
            }
        };
    }
    
    private async Task<AdvertObject> SeedObjectAsync()
    {
        var areaId = new Guid();
        var typeId = new Guid();
        
        var advertObject = new AdvertObject
        {
            AreaId = areaId,
            Area = new Area
            {
                Id = areaId,
                LatitudeSouth = 0,
                LongitudeEast = 1,
                LongitudeWest = 0,
                LatitudeNorth = 1,
                Name = "City",
                Regions = new []{ "Region"}
            },
            Type = new AdvertType
            {
                Name = "Type",
                Id = typeId,
            },
            TypeId = typeId,
            SerialCode = "1",
            Address = "Street",
            Region = "Region",
            Illuminated = true,
            Longitude = 0.5,
            Latitude = 0.5,
            Planes = new List<AdvertPlane>
            {
                new AdvertPlane
                {
                    Id = default,
                    ObjectId = default,
                    IsPermitted = false,
                    PermissionExpiryDate = new DateTime(),
                    IsPremium = false,
                    CreationDate = default,
                    ModificationDate = default,
                    PartialName = "A",
                    Photos = new List<PlanePhoto>()
                    {
                        new PlanePhoto
                        {
                            Id = default,
                            Content = new byte[]
                            {
                            },
                            Name = "image.png",
                            Mime = "image/png",
                        }
                    }
                }
            }
        };
        _dbContext.Add(advertObject);
        await _dbContext.SaveChangesAsync();

        return advertObject;
    }
}