using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdvertQueriesController : BasedController
{
    [HttpGet("map/{areaId:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAdvertMap([FromRoute] Guid areaId)
    {
        return Ok("yes");
    }
    
    [HttpGet("object/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetObject([FromRoute] Guid id)
    {
        return Ok("yes");
    }
    
    [HttpGet("plane/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetPlanes([FromRoute] Guid id)
    {
        return Ok("yes");
    }
    
    [HttpGet("object")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetObjectsPaged([FromRoute] Guid id)
    {
        return Ok("yes");
    }
    
    [HttpGet("plane")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetPlanesPaged([FromRoute] Guid id)
    {
        return Ok("yes");
    }
    
    [HttpGet("type")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetTypes()
    {
        return Ok("yes");
    }
}