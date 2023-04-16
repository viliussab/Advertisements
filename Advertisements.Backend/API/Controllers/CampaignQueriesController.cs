using Core.Errors;
using Microsoft.AspNetCore.Mvc;
using Queries.Handlers.Campaigns.BuildCampaignOffer;
using Queries.Handlers.Campaigns.GetCampaignById;
using Queries.Handlers.Campaigns.GetCampaigns;
using Queries.Handlers.Campaigns.GetCampaignsSummary;
using Queries.Handlers.Campaigns.GetCustomers;
using Queries.Responses;
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

    [HttpGet("campaign/summary")]
    [ProducesResponseType(typeof(IEnumerable<GetCampaignsSummaryWeeklyResponse>), 200)]
    public async Task<IActionResult> GetCampaignsSummary([FromQuery] GetCampaignsSummaryQuery query)
    {
        var campaigns = await Mediator.Send(query);

        return Ok(campaigns);
    }
    
    [HttpGet("campaign")]
    [ProducesResponseType(typeof(PageResponse<CampaignOverview>), 200)]
    public async Task<IActionResult> GetCampaigns([FromQuery] GetCampaignsQuery query)
    {
        var campaignsPage = await Mediator.Send(query);
        
        return Ok(campaignsPage);
    }
    
    [HttpGet("customer")]
    [ProducesResponseType(typeof(IEnumerable<CustomerFields>), 200)]
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await Mediator.Send(new GetCustomersQuery());
        
        return Ok(customers);
    }
    
    [HttpGet("campaign/downloadOffer/{id:guid}")]
    public async Task<IActionResult> BuildCampaignOffer([FromRoute] Guid id)
    {
        var file = await Mediator.Send(new BuildCampaignOfferQuery
        {
            Id = id,
        });
        
        return File(file);
    }
}