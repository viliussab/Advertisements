namespace API.Pkg.Jwt;

public class JwtPayload
{
    public Guid RefreshTokenId { get; set; }

    public string AccessToken { get; set; } = null!;
}