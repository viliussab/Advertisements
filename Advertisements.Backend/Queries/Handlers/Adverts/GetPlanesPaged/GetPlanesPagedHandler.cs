using Domain.Database;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Queries.Dtos.Prototypes;
using Queries.Handlers.Extensions;
using Queries.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedHandler : BasedHandler<GetPlanesPagedQuery, PageResponse<AdvertPlane>, GetObjectsPagedValidator>
{
    private readonly AdvertContext _context;

    public GetPlanesPagedHandler(GetObjectsPagedValidator validator, AdvertContext context)
        : base(validator)
    {
        _context = context;
    }
    
    public override async Task<PageResponse<AdvertPlane>> Handle(GetPlanesPagedQuery request, CancellationToken cancellationToken)
    {
        var area = _context.Set<Area>().FirstOrDefault(x => x.Id == request.AreaId);

        var searchPoints = request.Search.Split("");

        var queryable = _context.Set<AdvertPlane>()
            .Where(plane => area == null
                            || plane.Object.InArea(area))
            .Where(plane => request.TypeId == null
                            || plane.Object.TypeId == request.TypeId)
            .Where(plane => string.IsNullOrEmpty(request.Search) ||
                            searchPoints.Any(search =>
                                EF.Functions.ILike(plane.Object.Name + " " + plane.PartialName, search)
                                || EF.Functions.ILike(plane.Object.Address, search)
                                || EF.Functions.ILike(plane.Object.SerialCode, search)));

        var planes = await queryable
            .Include(x => x.Object)
            .Include(x => x.Object.Type)
            .ToPageAsync(request, cancellationToken);

        return planes;
    }
}