using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Components;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services;

public class JwtService : IJwtService
{
	private readonly IDateProvider _dateProvider;
	private readonly IOptions<JwtServiceSettings> _settings;
	private const string HashAlgorithm = SecurityAlgorithms.HmacSha256Signature;

	private readonly JwtSecurityTokenHandler _tokenHandler;
	private readonly SymmetricSecurityKey _securityKey;

	public JwtService(IDateProvider dateProvider, IOptions<JwtServiceSettings> settings)
	{
		_dateProvider = dateProvider;
		_settings = settings;
		_tokenHandler = new JwtSecurityTokenHandler();
		_securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.Value.Secret));
	}
	
	public UserRefreshToken BuildRefreshToken(User user)
	{
		var refreshToken = new UserRefreshToken
		{
			User = user,
			UserId = user.Id,
			ExpirationDate = _dateProvider.Now.Add(_settings.Value.RefreshTokenLifetime),
		};

		return refreshToken;
	}

	public Jwt BuildJwt(UserRefreshToken refreshToken)
	{
		var tokenDescriptor = CreateAccessTokenDescriptor(refreshToken.User);
		var securityToken = _tokenHandler.CreateToken(tokenDescriptor);

		return new Jwt
		{
			AccessToken = _tokenHandler.WriteToken(securityToken),
			RefreshTokenId = refreshToken.Id,
		};
	}
	
	private SecurityTokenDescriptor CreateAccessTokenDescriptor(User user)
	{
		var claims = new List<Claim>
		{			
			new(ClaimTypes.Sid, user.Id),
			new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			new(ClaimTypes.Role, user.Role.ToString())
		};

		var tokenDescriptor = new SecurityTokenDescriptor
		{
			Subject = new ClaimsIdentity(claims),
			Expires = _dateProvider.Now.Add(_settings.Value.TokenLifetime),
			SigningCredentials = new SigningCredentials(_securityKey, HashAlgorithm),
		};

		return tokenDescriptor;
	}
	
	public bool IsAccessTokenValid(string accessToken)
	{
		var expirationDate = GetExpirationDate(accessToken);
		
		return expirationDate > _dateProvider.Now;
	}
	
	private DateTime GetExpirationDate(string token)
	{
		var accessToken = _tokenHandler.ReadJwtToken(token);
		
		var claim = accessToken.Claims.First(claim => claim.Type.Equals("exp")).Value;
		var unixSeconds = long.Parse(claim);
		var expirationDate = DateTimeOffset.FromUnixTimeSeconds(unixSeconds).UtcDateTime;
		
		return expirationDate;
	}
}