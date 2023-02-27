using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CustomerCommandsController : BasedController
{
    [HttpPost("customer")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> CreateLocation()
    {
        return Ok("yes");
    }
    
    [HttpPut("customer/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateLocation([FromRoute] Guid id)
    {
        return Ok("yes");
    }
}