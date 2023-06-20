using API.Attributes;
using API.Extensions;
using Commands.Handlers.Auth.Login;
using Core.Tables.Enums;
using Microsoft.AspNetCore.Mvc;
using Queries.Handlers.Auth.GetUser;

namespace API.Controllers;

public class AuthController : BasedController
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        var jwt = await Mediator.Send(command);
        Response.AttachJwtCookies(jwt);

        return NoContent();
    }
	
    [HttpPost("logout")]
    [Login(Role.Admin)]
    public IActionResult Logout()
    {
        Response.ClearJwtCookies();

        return NoContent();
    }
    
    [HttpGet("me")]
    [Login(Role.Admin)]
    public async Task<IActionResult> GetMe()
    {
        var query = new GetUserQuery
        {
            Id = CurrentUserId
        };
		
        var result = await Mediator.Send(query);
		
        return Ok(result);
    }
}