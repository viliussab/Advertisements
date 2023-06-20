using Core.Database;
using Core.Tables.Entities.Customers;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;
using Queries.Responses.Prototypes;
using Customer = Core.Objects.Models.Customers.Customer;

namespace Queries.Handlers.Campaigns.GetCustomers;

public class GetCustomersHandler : BasedHandler<GetCustomersQuery, IEnumerable<Customer>, GetCustomersValidator>
{
    private readonly AdvertContext _context;
    
    public GetCustomersHandler(GetCustomersValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<IEnumerable<Customer>> Handle(GetCustomersQuery request, CancellationToken cancellationToken)
    {
        var customers = await _context
            .Set<CustomerTable>()
            .ToListAsync(cancellationToken: cancellationToken);
        var customersDto = customers.Adapt<List<Customer>>();

        return customersDto;
    }
}