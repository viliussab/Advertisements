using Core.Database;
using Core.Tables.Entities.Planes;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;

namespace Queries.Handlers.Adverts.GetTypes;

public class GetTypesHandler : BasedHandler<GetTypesQuery, IEnumerable<PlaneTypeTable>, GetTypesValidator>
{
    private readonly AdvertContext _context;
    
    public GetTypesHandler(GetTypesValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<IEnumerable<PlaneTypeTable>> Handle(GetTypesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Set<PlaneTypeTable>().ToListAsync(cancellationToken: cancellationToken);
    }
}