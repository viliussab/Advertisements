using Core.Database;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;
using Queries.Responses.Prototypes;
using Area = Core.Objects.Models.Areas.Area;

namespace Queries.Handlers.Adverts.GetAreas;

public class GetAreasHandler : BasedHandler<GetAreasQuery, IEnumerable<Area>, GetAreasValidator>
{
    private readonly AdvertContext _context;

    public GetAreasHandler(GetAreasValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<IEnumerable<Area>> Handle(GetAreasQuery request, CancellationToken cancellationToken)
    {
        var areas = await _context.Set<Core.Tables.Entities.Area.Area>()
            .ToListAsync(cancellationToken: cancellationToken);

        var areasDto = areas.Adapt<List<Area>>();

        return areasDto;
    }
}