using Commands.Requests;
using Commands.Responses;
using Core.Database;
using Core.EnumsRequest;
using Core.Errors;
using Core.Models;
using Core.Successes;
using Microsoft.EntityFrameworkCore;
using OneOf;
using Queries.Prototypes;

namespace Commands.Handlers.Adverts.UpdateObject;

public class UpdateObjectHandler : BasedHandler<
    UpdateObjectCommand,
    OneOf<List<ValidationError>, GuidSuccess>,
    UpdateObjectValidator>
{
    private readonly AdvertContext _context;

    public UpdateObjectHandler(
        UpdateObjectValidator validator,
        AdvertContext context)
        : base(validator)
    {
        _context = context;
    }
    
    public override async Task<OneOf<List<ValidationError>, GuidSuccess>> Handle(
        UpdateObjectCommand request,
        CancellationToken cancellationToken)
    {
        var result = await ValidateAsync(request, cancellationToken);

        return result.Match<OneOf<List<ValidationError>, GuidSuccess>>(
            validationErrors => validationErrors,
            success => UpdateAsync(request, cancellationToken).Result);
    }

    private async Task<GuidSuccess> UpdateAsync(
        UpdateObjectCommand request,
        CancellationToken cancellationToken)
    {
        await UpdateObjectFieldsAsync(request, cancellationToken);
        foreach (var plane in request.Planes)
        {
            await HandlePlaneMutateAsync(plane, request.Id, cancellationToken);
        }
        await _context.SaveChangesAsync(cancellationToken);

        return new GuidSuccess(request.Id);
    }
    
    private async Task UpdateObjectFieldsAsync(
        UpdateObjectCommand request,
        CancellationToken cancellationToken)
    {
        var currentObject = await _context.Set<AdvertObject>()
            .FirstAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        currentObject.SerialCode = request.SerialCode;
        currentObject.AreaId = request.AreaId;
        currentObject.TypeId = request.TypeId;
        currentObject.Name = request.Name;
        currentObject.Address = request.Address;
        currentObject.Region = request.Region;
        currentObject.Illuminated = request.Illuminated;
        currentObject.Longitude = request.Longitude;
        currentObject.Latitude = request.Latitude;

        _context.Update(currentObject);
    }

    private async Task HandlePlaneMutateAsync(
        UpdateObjectCommand.UpdatePlane request,
        Guid objectId,
        CancellationToken cancellationToken)
    {
        switch (request.UpdateStatus)
        {
            case UpdateStatus.Existing:
                await UpdatePlaneAsync();
                return;
            case UpdateStatus.Deleted:
                await DeletePlaneAsync();
                return;
            case UpdateStatus.New:
                await CreatePlaneAsync();
                return;
            default:
                throw new ArgumentOutOfRangeException();
        }

        async Task CreatePlaneAsync()
        {
            var plane = new AdvertPlane
            {
                ObjectId = objectId,
                PartialName = request.PartialName,
                IsPermitted = request.IsPermitted,
                PermissionExpiryDate = request.PermissionExpiryDate,
                Photos = request.Images.Select(file => new PlanePhoto
                {
                    Content = Convert.FromBase64String(file.Base64),
                    Mime = file.Mime,
                    Name = file.Name,
                }).ToList(),
            };
    
            await _context.AddAsync(plane, cancellationToken);
        }

        async Task DeletePlaneAsync()
        {
            var plane = await _context.Set<AdvertPlane>()
                .FirstAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);
            _context.Remove(plane);
        }

        async Task UpdatePlaneAsync()
        {
            await UpdatePlaneFieldsAsync(request, cancellationToken);
            foreach (var image in request.Images)
            {
                await HandleImageMutateAsync(image, request.Id, cancellationToken);
            }
        }
    }

    private async Task UpdatePlaneFieldsAsync(
        UpdateObjectCommand.UpdatePlane request,
        CancellationToken cancellationToken)
    {
        var plane = await _context.Set<AdvertPlane>()
            .FirstAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        plane.PartialName = request.PartialName;
        plane.IsPermitted = request.IsPermitted;
        plane.IsPremium = request.IsPremium;
        plane.PermissionExpiryDate = request.PermissionExpiryDate;

        _context.Update(plane);
    }
    
    private async Task HandleImageMutateAsync(
        UpdateFileRequest request,
        Guid? planeId,
        CancellationToken cancellationToken)
    {
        switch (request.UpdateStatus)
        {
            case FileUpdateStatus.Deleted:
                await DeletePhotoAsync();
                return;
            case FileUpdateStatus.New:
                await CreatePhotoAsync();
                return;
            default:
                throw new ArgumentOutOfRangeException();
        }

        async Task CreatePhotoAsync()
        {
            var photo = new PlanePhoto
            {
                Content = Convert.FromBase64String(request.Base64),
                Mime = request.Mime,
                Name = request.Name,
                PlaneId = planeId!.Value,
            };

            await _context.AddAsync(photo, cancellationToken);
        }

        async Task DeletePhotoAsync()
        {
            var photo = await _context
                .Set<PlanePhoto>()
                .FirstAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

            _context.Remove(photo);
        }
    }

    private async Task<OneOf<List<ValidationError>, GenericSuccess>> ValidateAsync(UpdateObjectCommand request, CancellationToken cancellationToken)
    {
        var validationErrors = new List<ValidationError>();

        var area = await _context.Set<Area>().FirstOrDefaultAsync(x => x.Id == request.AreaId, cancellationToken);
        if (area is null)
        {
            validationErrors.Add(new ValidationError(typeof(Area).ToString(), $"{typeof(Area)} does not exist"));
        }
        else if (!area.Regions.Contains(request.Region))
        {
            validationErrors.Add(new ValidationError(
                nameof(request.Region),
                "region does not belong to an area"));
        }

        var type = await _context.Set<AdvertType>()
            .FirstOrDefaultAsync(x => x.Id == request.TypeId, cancellationToken);
    
        if (type is null)
        {
            validationErrors.Add(new ValidationError(typeof(AdvertType).ToString(), $"{typeof(AdvertType)} does not exist"));
        }

        var validatorErrors = await Validator.ValidatorRequestAsync(request);
        validationErrors = validationErrors.Concat(validatorErrors).ToList();

        if (validationErrors.Any())
        {
            return validationErrors;
        }

        return new GenericSuccess();
    }
}