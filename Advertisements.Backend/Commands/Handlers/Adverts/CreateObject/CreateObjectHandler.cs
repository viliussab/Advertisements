using Commands.ResponseDto;
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
    OneOf<List<ValidationError>, List<NotFoundError>, CreateGuidSuccess>,
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
    
    public override async Task<OneOf<List<ValidationError>, List<NotFoundError>, CreateGuidSuccess>> Handle(
        CreateObjectCommand request,
        CancellationToken cancellationToken)
    {
        var result = await ValidateAsync(request, cancellationToken);

        return result.Match<OneOf<List<ValidationError>, List<NotFoundError>, CreateGuidSuccess>>(
            validationErrors => validationErrors,
            notFoundErrors => notFoundErrors,
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
                Permitted = planeRequest.Permitted,
                PermittedExpiryDate = planeRequest.PermittedExpiryDate
            }).ToList()
        };

        await _context.Set<AdvertObject>().AddAsync(advertObject, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new CreateGuidSuccess(advertObject.Id);
    }

    private async Task<OneOf<List<ValidationError>, List<NotFoundError>, GenericSuccess>> ValidateAsync(CreateObjectCommand request, CancellationToken cancellationToken)
    {
        var validationErrors = new List<ValidationError>();
        var notFoundErrors = new List<NotFoundError>();

        {
            var area = await _context.Set<Area>().FirstOrDefaultAsync(x => x.Id == request.AreaId, cancellationToken);
            if (area is null)
            {
                notFoundErrors.Add(new NotFoundError(request.AreaId, typeof(Area)));
            }
            else if (!area.Regions.Contains(request.Region))
            {
                validationErrors.Add(new ValidationError(
                    nameof(request.Region),
                    "region does not belong to an area"));
            }
        }

        {
            var type = await _context.Set<AdvertType>()
                .FirstOrDefaultAsync(x => x.Id == request.AreaId, cancellationToken);
        
            if (type is null)
            {
                notFoundErrors.Add(new NotFoundError(request.TypeId, typeof(AdvertType)));
            }
        }

        {
            var validationResponse = await Validator.ValidatorRequestAsync(request);
        
            validationResponse.Switch(
                errors => validationErrors = validationErrors.Concat(errors).ToList(),
                success => { });
        }

        if (validationErrors.Any())
        {
            return validationErrors;
        }

        if (notFoundErrors.Any())
        {
            return notFoundErrors;
        }

        return new GenericSuccess();
    }
}