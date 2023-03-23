using Core.Database;
using Core.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Queries.Extensions;
using Queries.Handlers.Adverts.GetAreas;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedHandler : BasedHandler<GetPlanesPagedQuery, PageResponse<GetPlanesPagedPlane>, GetPlanesPagedValidator>
{
    private readonly AdvertContext _context;

    public GetPlanesPagedHandler(GetPlanesPagedValidator validator, AdvertContext context)
        : base(validator)
    {
        _context = context;
    }
    
    public override async Task<PageResponse<GetPlanesPagedPlane>> Handle(GetPlanesPagedQuery request, CancellationToken cancellationToken)
    {
        var queryable = _context.Set<AdvertPlane>()
            .Where(plane => request.Name == null
                            || EF.Functions.ILike( plane.Object.Name + " " + plane.PartialName, $"%{request.Name}%"))
            .Where(plane => request.Address == null
                            || EF.Functions.ILike( plane.Object.Address, $"%{request.Address}%"))
            .Where(plane => request.Side == null
                            || EF.Functions.ILike( plane.PartialName, $"%{request.Side}%"))
            .Where(plane => request.Region == null
                            || plane.Object.Region == request.Region)
            .Where(plane => request.Illuminated == null
                            || plane.Object.Illuminated == request.Illuminated)
            .Where(plane => request.Premium == null
                            || plane.IsPremium == request.Premium)
            .OrderBy(x => x.IsPermitted == true)
            .ThenBy(x => x.PermissionExpiryDate);
 
        var pagedPlanes = await queryable
            .Include(x => x.Object)
            .Include(x => x.Object.Type)
            .Include(x => x.Object.Area)
            .ToPageAsync(request, cancellationToken);

        var dto = pagedPlanes.Adapt<PageResponse<GetPlanesPagedPlane>>();

        return dto;
    }
}