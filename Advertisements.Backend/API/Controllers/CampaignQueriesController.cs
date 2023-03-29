using Microsoft.AspNetCore.Mvc;
using Queries.Handlers.Campaigns.GetCustomers;
using Queries.Responses.Prototypes;

namespace API.Controllers;

public class CampaignQueriesController : BasedController
{
    [HttpGet("campaign/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetCampaign([FromRoute] Guid id)
    {
        return Ok("yes");
    }
    
    [HttpGet("plane/campaign/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetPlanesForCampaign([FromRoute] Guid id)
    {
        return Ok("yes");
    }
    
    [HttpGet("customer")]
    [ProducesResponseType(typeof(IEnumerable<CustomerFields>), 200)]
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await Mediator.Send(new GetCustomersQuery());
        
        return Ok(customers);
    }
}