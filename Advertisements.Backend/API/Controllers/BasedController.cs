using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api")]
public class BasedController : ControllerBase
{
    protected IMediator Mediator => HttpContext.RequestServices.GetService<IMediator>() ??
                                    throw new InvalidOperationException("Mediator was not found");
    
    protected Guid CurrentUserId
    {
        get
        {
            try
            {
                return Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            }
            catch
            {
                throw new InvalidOperationException(
                    $"Could not access user when the user is anonymous");
            }
        }
    }
}