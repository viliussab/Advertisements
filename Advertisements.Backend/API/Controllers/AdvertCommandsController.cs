using Commands.Handlers.Adverts.CreateObject;
using Commands.ResponseDto;
using Core.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdvertCommandsController : BasedController
{
    [HttpPost("object")]
    [ProducesResponseType(typeof(CreateGuidSuccess), 200)]
    [ProducesResponseType(typeof(List<NotFoundError>), 404)]
    [ProducesResponseType(typeof(List<ValidationError>), 400)]
    public IActionResult CreateObject([FromBody] CreateObjectCommand command)
    {
        var response = Mediator.Send(command).Result;

        return response.Match<IActionResult>(
            BadRequest,
            NotFound,
            Ok);
    }

    [HttpPut("object/{id:guid}")]
    [ProducesResponseType(typeof(Guid), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateObject([FromRoute] Guid id)
    {
        return Ok("yes");
    }
}