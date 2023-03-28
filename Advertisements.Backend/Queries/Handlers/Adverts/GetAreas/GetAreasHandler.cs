using Core.Database;
using Core.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetAreas;

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