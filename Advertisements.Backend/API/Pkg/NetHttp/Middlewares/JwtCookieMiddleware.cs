using API.Modules.Auth;
using API.Pkg.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Pkg.NetHttp.Middlewares;

public class JwtCookieMiddleware
{
    private readonly RequestDelegate _next;

    public JwtCookieMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IJwtService jwtService)
    {
        var requestJwt = context.Request.GetTokenDtoOrDefault();

        if (requestJwt is not null)
        {
            await UpdateAuthHeadersAsync(context, jwtService, requestJwt);
        }

        await _next(context);
    }

    private static async Task UpdateAuthHeadersAsync(HttpContext context, IJwtService jwtService, JwtPayload requestJwtPayload)
    {
        try
        {
            var responseJwt = await jwtService.SyncAccessTokenAsync(requestJwtPayload);
            context.Response.AttachJwtCookies(responseJwt);
            context.Request.Headers.Add("Authorization",
                $"{JwtBearerDefaults.AuthenticationScheme} {responseJwt.AccessToken}");
        }
        catch (SecurityTokenExpiredException)
        {
            context.Response.ClearJwtCookies();
        }
    }
}