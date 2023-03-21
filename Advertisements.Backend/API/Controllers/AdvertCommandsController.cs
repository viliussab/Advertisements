using Commands.Handlers.Adverts.CreateObject;
using Commands.Handlers.Adverts.UploadObjects;
using Commands.Responses;
using Core.Errors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdvertCommandsController : BasedController
{
    [HttpPost("object")]
    [ProducesResponseType(typeof(GuidSuccess), 200)]
    [ProducesResponseType(typeof(List<ValidationError>), 400)]
    public IActionResult CreateObject([FromBody] CreateObjectCommand command)
    {
        var response = Mediator.Send(command).Result;

        return response.Match<IActionResult>(
            BadRequest,
            Ok);
    }

    [HttpPut("object/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateObject([FromRoute] Guid id)
    {
        return Ok("yes");
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
}