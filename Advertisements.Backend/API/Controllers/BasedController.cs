using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api")]
public class BasedController : ControllerBase
{
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