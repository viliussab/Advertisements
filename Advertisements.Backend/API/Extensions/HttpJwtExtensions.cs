using Core.Components;

namespace API.Extensions;

public static class HttpJwtCookieExtensions
{
    private const string AccessTokenKey = "accessToken";
    private const string RefreshTokenIdKey = "refreshToken";
	
    public static Jwt? GetTokenDtoOrDefault(this HttpRequest httpRequest)
    {
        var token = httpRequest.Cookies[AccessTokenKey];
        var refreshToken = httpRequest.Cookies[RefreshTokenIdKey];

        if (token is null || !Guid.TryParse(refreshToken, out var refreshTokenGuid))
        {
            return null;
        }

        return new Jwt
        {
            RefreshTokenId = refreshTokenGuid,
            AccessToken = token,
        };
    }
	
    public static void AttachJwtCookies(this HttpResponse httpResponse, Jwt dto)
    {
        httpResponse.Cookies.Append(
            AccessTokenKey, 
            dto.AccessToken,
            BuildCookieOptions(DateTime.Now.AddYears(2)));
		
        httpResponse.Cookies.Append(
            RefreshTokenIdKey, 
            dto.RefreshTokenId.ToString(),
            BuildCookieOptions(DateTime.Now.AddYears(2)));
    }
	
    public static void ClearJwtCookies(this HttpResponse httpResponse)
    {
        httpResponse.Cookies.Append(
            AccessTokenKey, 
            string.Empty,
            BuildCookieOptions(DateTime.Now.AddYears(-1)));
		
        httpResponse.Cookies.Append(
            RefreshTokenIdKey,
            string.Empty,
            BuildCookieOptions(DateTime.Now.AddYears(-1)));
    }
	
    private static CookieOptions BuildCookieOptions(DateTime expiryDate)
    {
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Expires = expiryDate,
            SameSite = SameSiteMode.None,
        };
    }
}