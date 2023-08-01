using API.Commands.Responses;
using API.Modules.Campaigns.BuildCampaignOffer;
using API.Modules.Campaigns.ConfirmCampaign;
using API.Modules.Campaigns.CreateCampaign;
using API.Modules.Campaigns.GetCampaignById;
using API.Modules.Campaigns.GetCampaignOptions;
using API.Modules.Campaigns.GetCampaigns;
using API.Modules.Campaigns.GetCampaignsSummary;
using API.Modules.Campaigns.UpdateCampaign;
using API.Modules.Campaigns.UpdateCampaignPlanes;
using API.Modules.Campaigns.UpsertCampaignPlane;
using API.Pkg.Errors;
using API.Pkg.NetHttp;
using API.Queries.Responses;
using API.Queries.Responses.Prototypes;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.Campaigns;

public class CampaignQueriesController : BasedController
{
    [HttpPost("campaign")]
    [ProducesResponseType(typeof(GuidSuccess), StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateCampaign([FromBody] CreateCampaignCommand command)
    {
        var result = await Mediator.Send(command);
        
        return Ok(result);
    }
    

    [HttpPut("campaign/{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateCampaign([FromRoute] Guid id, [FromBody] UpdateCampaignCommand command)
    {
        command.Id = id;
        var response = await Mediator.Send(command);
        
        return Ok(response);
    }
    
    [HttpPatch("campaign/{id:guid}/planes")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ReplaceCampaignAdverts([FromRoute] Guid id, [FromBody] UpdateCampaignPlanesCommand command)
    {
        command.Id = id;
        await Mediator.Send(command);
        
        return NoContent();
    }
    
    [HttpPatch("campaign/{campaignId:guid}/plane/{planeId:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpsertCampaignPlane([FromRoute] Guid campaignId, [FromRoute] Guid planeId, [FromBody] UpsertCampaignPlaneCommand command)
    {
        command.CampaignId = campaignId;
        command.PlaneId = planeId;
        await Mediator.Send(command);
        
        return NoContent();
    }
    
    [HttpPatch("campaign/{id:guid}/confirm")]
    [ProducesResponseType(typeof(ConflictError), StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ConfirmCampaign([FromRoute] Guid id)
    {
        var result = await Mediator.Send(new ConfirmCampaignCommand { Id = id });

        return result.Match<IActionResult>(
            Conflict,
            _ => NoContent());
    }
    
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
    
    [HttpGet("campaign/options")]
    [ProducesResponseType(typeof(IEnumerable<CampaignOption>), 200)]
    public async Task<IActionResult> GetCampaignOptions()
    {
        var campaignOptions = await Mediator.Send(new GetCampaignsOptionsQuery());
        
        return Ok(campaignOptions);
    }
    
    [HttpGet("campaign")]
    [ProducesResponseType(typeof(PageResponse<CampaignOverview>), 200)]
    public async Task<IActionResult> GetCampaigns([FromQuery] GetCampaignsQuery query)
    {
        var campaignsPage = await Mediator.Send(query);
        
        return Ok(campaignsPage);
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