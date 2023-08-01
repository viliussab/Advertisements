using API.Queries.Responses.Prototypes;
using MediatR;

namespace API.Modules.Customers.GetCustomers;

public class GetCustomersQuery : IRequest<IEnumerable<CustomerFields>>
{
}