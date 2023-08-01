using API.Queries.Prototypes;
using API.Queries.Responses.Prototypes;
using Core.Database;
using Core.Database.Tables;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.Billboards.GetAreas;

public class GetAreasHandler : BasedHandler<GetAreasQuery, IEnumerable<AreaFields>, GetAreasValidator>
{
    private readonly AdvertContext _context;

    public GetAreasHandler(GetAreasValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<IEnumerable<AreaFields>> Handle(GetAreasQuery request, CancellationToken cancellationToken)
    {
        var areas = await _context.Set<Area>()
            .ToListAsync(cancellationToken: cancellationToken);

        var areasDto = areas.Adapt<List<AreaFields>>();

        return areasDto;
    }
}