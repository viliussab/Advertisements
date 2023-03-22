using Core.Errors;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Queries.Handlers.Adverts.GetAreas;
using Queries.Handlers.Adverts.GetPlanesPaged;
using Queries.Handlers.Adverts.GetTypes;

namespace API.Controllers;

public class AdvertQueriesController : BasedController
{
    [HttpGet("area")]
    [ProducesResponseType(typeof(IEnumerable<Area>), 200)]
    public async Task<IActionResult> GetAreas()
    {
        var areas = await Mediator.Send(new GetAreasQuery());

        return Ok(areas);
    }
    
    [HttpGet("type")]
    [ProducesResponseType(typeof(IEnumerable<Type>), 200)]
    public async Task<IActionResult> GetTypes()
    {
        var types = await Mediator.Send(new GetTypesQuery());

        return Ok(types);
    }
    
    [HttpGet("map/{areaId:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetAdvertMap([FromRoute] Guid areaId)
    {
        return Ok("yes");
    }

    [HttpGet("object/{id:guid}")]
    [ProducesResponseType(typeof(GetObjectByIdObject), 200)]
    [ProducesResponseType(typeof(NotFoundError), 404)]
    public async Task<IActionResult> GetObjectById([FromRoute] Guid id)
    {
        var response = await Mediator.Send(new GetObjectByIdQuery {Id = id});
        
        return response.Match<IActionResult>(
            Ok,
            NotFound);
    }

    [HttpGet("plane")]
    [ProducesResponseType(typeof(List<AdvertPlane>), 200)]
    public async Task<IActionResult> GetPlanesPaged([FromQuery] GetPlanesPagedQuery query)
    {
        var response = await Mediator.Send(query);
        
        return Ok(response);
    }
}