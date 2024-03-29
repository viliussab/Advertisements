using System.Security.Claims;
using API.Queries.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace API.Pkg.NetHttp;

[ApiController]
[Route("api")]
public class BasedController : ControllerBase
{
    protected IMediator Mediator => HttpContext.RequestServices.GetService<IMediator>() ??
                                    throw new InvalidOperationException("Mediator was not found");
    
    protected string CurrentUserId
    {
        get
        {
            try
            {
                return User.FindFirstValue(ClaimTypes.Sid)!;
            }
            catch
            {
                throw new InvalidOperationException(
                    $"Could not access user when the user is anonymous");
            }
        }
    }
    
    protected FileContentResult File(DownloadFile file)
    {
        var provider = new FileExtensionContentTypeProvider();
        var contentType = provider.TryGetContentType(file.FileName, out var parsedContentType) 
            ? parsedContentType
            : "application/octet-stream";
			
        return File(file.Content, contentType, file.FileName);
    }
}