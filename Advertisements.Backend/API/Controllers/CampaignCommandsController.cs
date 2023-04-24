using Commands.Handlers.Campaigns.ConfirmCampaign;
using Commands.Handlers.Campaigns.CreateCampaign;
using Commands.Handlers.Campaigns.CreateCustomer;
using Commands.Handlers.Campaigns.UpdateCampaign;
using Commands.Handlers.Campaigns.UpdateCampaignPlanes;
using Commands.Handlers.Campaigns.UpdateCustomer;
using Commands.Responses;
using Core.Errors;
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
    public async Task<IActionResult> UpdateCampaignAdverts([FromRoute] Guid id, [FromBody] UpdateCampaignPlanesCommand command)
    {
        command.Id = id;
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
}