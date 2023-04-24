using Core.Database;
using Core.Models;
using Mapster;
using MediatR;

namespace Commands.Handlers.Campaigns.UpdateCustomer;

public class UpdateCustomerHandler : IRequestHandler<UpdateCustomerCommand>
{
    private readonly AdvertContext _context;

    public UpdateCustomerHandler(AdvertContext context)
    {
        _context = context;
    }
    
    public async Task Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
    {
        var customer = request.Adapt<Customer>();

         _context.Update(customer);
        await _context.SaveChangesAsync(cancellationToken);
    }
}