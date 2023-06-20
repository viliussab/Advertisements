namespace Core.Objects.Others;

public class Jwt
{
    public Guid RefreshTokenId { get; set; }

    public string AccessToken { get; set; } = null!;
}