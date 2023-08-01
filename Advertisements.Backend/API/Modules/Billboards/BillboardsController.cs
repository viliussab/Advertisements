using API.Commands.Responses;
using API.Modules.Billboards.CreateObject;
using API.Modules.Billboards.GetAreaByName;
using API.Modules.Billboards.GetAreas;
using API.Modules.Billboards.GetObjectById;
using API.Modules.Billboards.GetPlanesPaged;
using API.Modules.Billboards.GetPlaneSummary;
using API.Modules.Billboards.GetTypes;
using API.Modules.Billboards.UpdateObject;
using API.Modules.Billboards.UploadObjects;
using API.Pkg.Errors;
using API.Pkg.NetHttp;
using API.Queries.Responses.Prototypes;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.Billboards;

public class AdvertCommandsController : BasedController
{
    [HttpPost("object")]
    [ProducesResponseType(typeof(GuidSuccess), 200)]
    [ProducesResponseType(typeof(List<ValidationError>), 400)]
    public async Task<IActionResult> CreateObject([FromBody] CreateObjectCommand command)
    {
        var response = await Mediator.Send(command);

        return response.Match<IActionResult>(
            BadRequest,
            Ok);
    }

    [HttpPut("object/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateObject([FromRoute] Guid id, [FromBody] UpdateObjectCommand command)
    {
        command.Id = id;
        
        var response = await Mediator.Send(command);
        
        return response.Match<IActionResult>(
            BadRequest,
            Ok);
    }

    [HttpPost("object/upload")]
    [ProducesResponseType(204)]
    public async Task<IActionResult> UploadObjects(IFormFile file)
    {
        var command = new UploadObjectsCommand
        {
            File = file.OpenReadStream(),
        };
        await Mediator.Send(command);
        
        return NoContent();
    }
    
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
    [ProducesResponseType(typeof(PageResponse<GetPlanesPagedPlane>), 200)]
    public async Task<IActionResult> GetPlanesPaged([FromQuery] GetPlanesPagedQuery query)
    {
        var response = await Mediator.Send(query);
        
        return Ok(response);
    }
    
    [HttpGet("plane/summary")]
    [ProducesResponseType(typeof(PageResponse<PlaneWithWeeks>), 200)]
    public async Task<IActionResult> GetPlaneSummaryPaged([FromQuery] GetWeeklySummaryQuery query)
    {
        var response = await Mediator.Send(query);
        
        return Ok(response);
    }
}