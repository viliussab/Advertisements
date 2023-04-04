using Core.Errors;
using Microsoft.AspNetCore.Mvc;
using Queries.Handlers.Campaigns.GetCampaignById;
using Queries.Handlers.Campaigns.GetCampaigns;
using Queries.Handlers.Campaigns.GetCustomers;
using Queries.Responses.Prototypes;

namespace API.Controllers;

public class CampaignQueriesController : BasedController
{
    [HttpGet("campaign/{id:guid}")]
    [ProducesResponseType(typeof(CampaignFields), 200)]
    [ProducesResponseType(typeof(NotFoundError),404)]
    public async Task<IActionResult> GetCampaign([FromRoute] Guid id)
    {
        var query = new GetCampaignByIdQuery
        {
            Id = id,
        };

        var result = await Mediator.Send(query);

        return result.Match<IActionResult>(
            NotFound,
            Ok);
    }
    
    [HttpGet("plane/campaign/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetPlanesForCampaign([FromRoute] Guid id)
    {
        return Ok("yes");
    }
    
    [HttpGet("campaign")]
    [ProducesResponseType(typeof(PageResponse<GetCampaignsCampaign>), 200)]
    public async Task<IActionResult> GetCampaigns([FromQuery] GetCampaignsQuery query)
    {
        var customers = await Mediator.Send(query);
        
        return Ok(customers);
    }
    
    [HttpGet("customer")]
    [ProducesResponseType(typeof(IEnumerable<CustomerFields>), 200)]
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await Mediator.Send(new GetCustomersQuery());
        
        return Ok(customers);
    }
    
    [HttpGet("campaign/downloadOffer/{id:guid}")]
    [ProducesResponseType(typeof(PageResponse<GetCampaignsCampaign>), 200)]
    public async Task<IActionResult> BuildCampaignOffer([FromRoute] Guid id)
    {
        var customers = await Mediator.Send(query);
        
        return Ok(customers);
    }
}