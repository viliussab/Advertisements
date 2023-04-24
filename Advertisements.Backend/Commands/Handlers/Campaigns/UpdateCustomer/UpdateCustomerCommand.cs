using Commands.Handlers.Campaigns.CreateCustomer;

namespace Commands.Handlers.Campaigns.UpdateCustomer;

public class UpdateCustomerCommand : CreateCustomerCommand
{
    public Guid Id { get; set; }
}