using Core.Database;
using Core.Models;
using Mapster;
using MediatR;

namespace Commands.Handlers.Campaigns.CreateCustomer;

public class CreateCustomerHandler : IRequestHandler<CreateCustomerCommand>
{
    private readonly AdvertContext _context;

    public CreateCustomerHandler(AdvertContext context)
    {
        _context = context;
    }
    
    public async Task Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
    {
        var customer = request.Adapt<Customer>();

        await _context.AddAsync(customer, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }
}