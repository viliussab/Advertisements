namespace API.Pkg.Jwt;

public class JwtServiceSettings
{
    public string Secret { get; set; } = null!;

    public TimeSpan TokenLifetime { get; set; }
	
    public TimeSpan RefreshTokenLifetime { get; set; }

    public static string SectionName => "Jwt";
}