using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CampaignQueriesController : BasedController
{
    [HttpGet("area/{areaId}/campaign/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAreaForCampaign([FromRoute] Guid id, [FromRoute] Guid areaId)
    {
        return Ok("yes");
    }
    
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
}