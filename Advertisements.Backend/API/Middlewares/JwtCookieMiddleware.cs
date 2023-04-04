using API.Extensions;
using Core.Components;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Middlewares;

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

    private static async Task UpdateAuthHeadersAsync(HttpContext context, IJwtService jwtService, Jwt requestJwt)
    {
        try
        {
            var responseJwt = await jwtService.SyncAccessTokenAsync(requestJwt);
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