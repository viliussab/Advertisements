using Core.Database;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;

namespace Queries.Handlers.Adverts.GetTypes;

public class GetTypesHandler : BasedHandler<GetTypesQuery, IEnumerable<AdvertType>, GetTypesValidator>
{
    private readonly AdvertContext _context;
    
    public GetTypesHandler(GetTypesValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<IEnumerable<AdvertType>> Handle(GetTypesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Set<AdvertType>().ToListAsync(cancellationToken: cancellationToken);
    }
}