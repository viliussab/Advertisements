using Core.Database;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;

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
        return await _context.Set<Area>().ToListAsync(cancellationToken: cancellationToken);
    }
}