using API.Modules.Auth.GetUser;
using API.Modules.Auth.Login;
using API.Pkg.NetHttp;
using API.Pkg.NetHttp.Attributes;
using Core.Database.Tables;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.Auth;

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
    [Login(UserRole.Admin)]
    public IActionResult Logout()
    {
        Response.ClearJwtCookies();

        return NoContent();
    }
    
    [HttpGet("me")]
    [Login(UserRole.Admin)]
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