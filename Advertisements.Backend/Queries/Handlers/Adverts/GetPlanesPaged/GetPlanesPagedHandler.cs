using Core.Database;
using Core.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Queries.Handlers.Adverts.GetAreas;
using Queries.Handlers.Extensions;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedHandler : BasedHandler<GetPlanesPagedQuery, PageResponse<GetPlanesPagedResponse>, GetPlanesPagedValidator>
{
    private readonly AdvertContext _context;

    public GetPlanesPagedHandler(GetPlanesPagedValidator validator, AdvertContext context)
        : base(validator)
    {
        _context = context;
    }
    
    public override async Task<PageResponse<GetPlanesPagedResponse>> Handle(GetPlanesPagedQuery request, CancellationToken cancellationToken)
    {
        var area = _context.Set<Area>().FirstOrDefault(x => x.Id == request.AreaId);
        
        var queryable = _context.Set<AdvertPlane>()
            .Where(plane => area == null
                            || plane.Object.InArea(area))
            .Where(plane => request.TypeId == null
                            || plane.Object.TypeId == request.TypeId)
            .OrderBy(x => x.IsPermitted == true)
            .ThenBy(x => x.ModificationDate);
 
        var pagedPlanes = await queryable
            .Include(x => x.Object)
            .Include(x => x.Object.Type)
            .Include(x => x.Object.Area)
            .ToPageAsync(request, cancellationToken);

        var dto = pagedPlanes.Adapt<PageResponse<GetPlanesPagedResponse>>();

        return dto;
    }
}