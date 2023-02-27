using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


public class AdvertCommandsController : BasedController
{
    [HttpPost("object")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> CreateLocation()
    {
        return Ok("yes");
    }
    
    [HttpPost("type")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> CreateType()
    {
        return Ok("yes");
    }
    
    [HttpPut("type")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateLocation()
    {
        return Ok("yes");
    }
    
    [HttpPut("object/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateLocation([FromRoute] Guid id)
    {
        return Ok("yes");
    }

    [HttpPut("plane/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdatePlane([FromRoute] Guid id)
    {
        return Ok("yes");
    }
}