using API.Modules.Customers.CreateCustomer;
using API.Modules.Customers.GetCustomers;
using API.Modules.Customers.UpdateCustomer;
using API.Pkg.NetHttp;
using API.Queries.Responses.Prototypes;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.Customers;

public class CustomersController : BasedController
{
    [HttpPost("customer")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomerCommand command)
    {
        await Mediator.Send(command);

        return NoContent();
    }
    
    [HttpPut("customer/{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpdateCustomer([FromRoute] Guid id, [FromBody] UpdateCustomerCommand command)
    {
        command.Id = id;
        await Mediator.Send(command);

        return NoContent();
    }

    [HttpGet("customer")]
    [ProducesResponseType(typeof(IEnumerable<CustomerFields>), 200)]
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await Mediator.Send(new GetCustomersQuery());
        
        return Ok(customers);
    }
}