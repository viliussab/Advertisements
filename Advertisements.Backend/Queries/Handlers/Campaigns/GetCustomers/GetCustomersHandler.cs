using Core.Database;
using Core.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCustomers;

public class GetCustomersHandler : BasedHandler<GetCustomersQuery, IEnumerable<CustomerFields>, GetCustomersValidator>
{
    private readonly AdvertContext _context;
    
    public GetCustomersHandler(GetCustomersValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<IEnumerable<CustomerFields>> Handle(GetCustomersQuery request, CancellationToken cancellationToken)
    {
        var customers = await _context.Set<Customer>().ToListAsync(cancellationToken: cancellationToken);
        var customersDto = customers.Adapt<List<CustomerFields>>();

        return customersDto;
    }
}