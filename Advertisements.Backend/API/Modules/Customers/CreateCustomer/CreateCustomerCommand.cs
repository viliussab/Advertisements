using MediatR;

namespace API.Modules.Customers.CreateCustomer;

public class CreateCustomerCommand : IRequest
{
    public string Name { get; set; } = null!;

    public string CompanyCode { get; set; } = null!;

    public string VatCode { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string ContactPerson { get; set; } = null!;

    public string Email { get; set; } = null!;
}