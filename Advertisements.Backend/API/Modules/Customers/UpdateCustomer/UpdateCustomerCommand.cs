using API.Modules.Customers.CreateCustomer;

namespace API.Modules.Customers.UpdateCustomer;

public class UpdateCustomerCommand : CreateCustomerCommand
{
    public Guid Id { get; set; }
}