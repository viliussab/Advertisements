using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CampaignCommandsController : BasedController
{
    [HttpPost("campaign")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> CreateCampaign()
    {
        return Ok("yes");
    }
    
    [HttpPut("campaign/{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateCampaign([FromRoute] Guid id)
    {
        return Ok("yes");
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