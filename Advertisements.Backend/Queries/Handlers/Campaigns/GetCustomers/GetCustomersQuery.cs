using Core.Objects.Models.Customers;
using MediatR;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCustomers;

public class GetCustomersQuery : IRequest<IEnumerable<Customer>>
{
}