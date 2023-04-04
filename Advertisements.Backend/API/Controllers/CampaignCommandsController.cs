using Commands.Handlers.Campaigns.CreateCampaign;
using Commands.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CampaignCommandsController : BasedController
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
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateCampaignAdverts([FromRoute] Guid id)
    {
        return Ok("yes");
    }
    
    [HttpPatch("campaign/{id:guid}/status")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateCampaignStatus([FromRoute] Guid id)
    {
        return Ok("yes");
    }
}