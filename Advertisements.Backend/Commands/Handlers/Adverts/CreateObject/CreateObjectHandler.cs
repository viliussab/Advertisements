using Commands.Responses;
using Core.Database;
using Core.Errors;
using Core.Models;
using Core.Successes;
using Microsoft.EntityFrameworkCore;
using OneOf;
using Queries.Prototypes;

namespace Commands.Handlers.Adverts.CreateObject;

public class CreateObjectHandler : BasedHandler<
    CreateObjectCommand,
    OneOf<List<ValidationError>, CreateGuidSuccess>,
    CreateObjectValidator>
{
    private readonly AdvertContext _context;

    public CreateObjectHandler(
        CreateObjectValidator validator,
        AdvertContext context)
        : base(validator)
    {
        _context = context;
    }
    
    public override async Task<OneOf<List<ValidationError>, CreateGuidSuccess>> Handle(
        CreateObjectCommand request,
        CancellationToken cancellationToken)
    {
        var result = await ValidateAsync(request, cancellationToken);

        return result.Match<OneOf<List<ValidationError>, CreateGuidSuccess>>(
            validationErrors => validationErrors,
            success => CreateAsync(request, cancellationToken).Result);
    }

    private async Task<CreateGuidSuccess> CreateAsync(
        CreateObjectCommand request,
        CancellationToken cancellationToken)
    {
        var advertObject = new AdvertObject
        {
            SerialCode = request.SerialCode,
            AreaId = request.AreaId,
            TypeId = request.TypeId,
            Name = request.Name,
            Address = request.Address,
            Region = request.Region,
            Illuminated = request.Illuminated,
            Longitude = request.Longitude,
            Latitude = request.Latitude,
            Planes = request.Planes.Select(planeRequest => new AdvertPlane
            {
                PartialName = planeRequest.PartialName,
                IsPermitted = planeRequest.IsPermitted,
                PermissionExpiryDate = planeRequest.PermissionExpiryDate,
                Photos = planeRequest.Images.Select(file => new PlanePhoto
                {
                    Content = Convert.FromBase64String(file.Base64),
                    Mime = file.Mime,
                    Name = file.Name,
                }).ToList(),
            }).ToList()
        };

        await _context.Set<AdvertObject>().AddAsync(advertObject, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new CreateGuidSuccess(advertObject.Id);
    }

    private async Task<OneOf<List<ValidationError>, GenericSuccess>> ValidateAsync(CreateObjectCommand request, CancellationToken cancellationToken)
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