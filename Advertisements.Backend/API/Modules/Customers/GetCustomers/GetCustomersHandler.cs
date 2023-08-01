using API.Queries.Responses.Prototypes;
using Core.Database;
using Core.Database.Tables;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.Customers.GetCustomers;

public class GetCustomersHandler : IRequestHandler<GetCustomersQuery, IEnumerable<CustomerFields>>
{
    private readonly AdvertContext _context;
    
    public GetCustomersHandler(AdvertContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CustomerFields>> Handle(GetCustomersQuery request, CancellationToken cancellationToken)
    {
        var customers = await _context
            .Set<Customer>()
            .ToListAsync(cancellationToken: cancellationToken);
        var customersDto = customers.Adapt<List<CustomerFields>>();

        return customersDto;
    }
}