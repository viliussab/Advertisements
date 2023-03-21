using Commands.Handlers.Adverts.CreateObject;
using Commands.Responses;
using Core.Database;
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
        throw new NotImplementedException();
        
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

        return new GuidSuccess(advertObject.Id);
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