using API.Pkg.Errors;
using API.Queries.Prototypes;
using Core.Database;
using Core.Database.Tables;
using Mapster;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace API.Modules.Billboards.GetObjectById;

public class GetObjectByIdHandler : BasedHandler<GetObjectByIdQuery, OneOf<GetObjectByIdObject, NotFoundError>, GetObjectByIdValidator>
{
    private readonly AdvertContext _context;

    public GetObjectByIdHandler(GetObjectByIdValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<OneOf<GetObjectByIdObject, NotFoundError>> Handle(GetObjectByIdQuery request, CancellationToken cancellationToken)
    {
        var advertObject = await _context.Set<AdvertObject>()
                .Include(x => x.Planes)
                    .ThenInclude(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        if (advertObject is null)
        {
            return new NotFoundError(request.Id, typeof(AdvertObject));
        }

        var dto = advertObject.Adapt<GetObjectByIdObject>();

        return dto;
    }
}