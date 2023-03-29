using Core.Errors;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Queries.Handlers.Adverts.GetAreaByName;
using Queries.Handlers.Adverts.GetAreas;
using Queries.Handlers.Adverts.GetObjectById;
using Queries.Handlers.Adverts.GetPlanesPaged;
using Queries.Handlers.Adverts.GetTypes;
using Queries.Responses.Prototypes;

namespace API.Controllers;

public class AdvertQueriesController : BasedController
{
    [HttpGet("area")]
    [ProducesResponseType(typeof(IEnumerable<AreaFields>), 200)]
    public async Task<IActionResult> GetAreas()
    {
        var areas = await Mediator.Send(new GetAreasQuery());

        return Ok(areas);
    }

    [HttpGet("type")]
    [ProducesResponseType(typeof(IEnumerable<AdvertTypeFields>), 200)]
    public async Task<IActionResult> GetTypes()
    {
        var types = await Mediator.Send(new GetTypesQuery());

        return Ok(types);
    }
    
    [HttpGet("area/{name}")]
    [ProducesResponseType(typeof(GetAreaByNameResponse), 200)]
    [ProducesResponseType(typeof(NotFoundError), 404)]
    public async Task<IActionResult> GetAreaByName([FromRoute] string name)
    {
        var response = await Mediator.Send(new GetAreaByNameQuery
        {
            Name = name
        });

        return response.Match<IActionResult>(
            NotFound,
            Ok);
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