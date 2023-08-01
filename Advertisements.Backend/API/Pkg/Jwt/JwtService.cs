using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Database;
using Core.Database.Tables;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace API.Pkg.Jwt;

public interface IJwtService
{
	UserRefreshToken BuildRefreshToken(User user);

	JwtPayload BuildJwt(UserRefreshToken refreshToken);

	Task<JwtPayload> SyncAccessTokenAsync(JwtPayload jwtPayloadDto);
}

public class JwtService : IJwtService
{
	private readonly IDateProvider _dateProvider;
	private readonly JwtServiceSettings _jwtSettings;
	private const string HashAlgorithm = SecurityAlgorithms.HmacSha256Signature;

	private readonly JwtSecurityTokenHandler _tokenHandler;
	private readonly SymmetricSecurityKey _securityKey;
	private readonly UserManager<User> _userManager;
	private readonly AdvertContext _context;

	public JwtService(
		IDateProvider dateProvider,
		IOptionsMonitor<JwtServiceSettings> jwtSettings,
		UserManager<User> userManager,
		AdvertContext context)
	{
		_dateProvider = dateProvider;
		_jwtSettings = jwtSettings.CurrentValue;
		_userManager = userManager;
		_context = context;
		_tokenHandler = new JwtSecurityTokenHandler();
		_securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtSettings.Secret));
	}
	
	public UserRefreshToken BuildRefreshToken(User user)
	{
		var refreshToken = new UserRefreshToken
		{
			User = user,
			UserId = user.Id,
			ExpirationDate = _dateProvider.Now.Add(_jwtSettings.RefreshTokenLifetime),
		};

		return refreshToken;
	}

	public JwtPayload BuildJwt(UserRefreshToken refreshToken)
	{
		var tokenDescriptor = CreateAccessTokenDescriptor(refreshToken.User);
		var securityToken = _tokenHandler.CreateToken(tokenDescriptor);

		return new JwtPayload
		{
			AccessToken = _tokenHandler.WriteToken(securityToken),
			RefreshTokenId = refreshToken.Id,
		};
	}

	private SecurityTokenDescriptor CreateAccessTokenDescriptor(User user, DateTime? expirationDate = null)
	{
		var claims = new List<Claim>
		{			
			new(ClaimTypes.Sid, user.Id.ToString()),
			new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			new(ClaimTypes.Role, user.Role.ToString())
		};
		
		var tokenDescriptor = new SecurityTokenDescriptor
		{
			Subject = new ClaimsIdentity(claims),
			Expires = expirationDate ?? _dateProvider.Now.Add(_jwtSettings.TokenLifetime),
			SigningCredentials = new SigningCredentials(_securityKey, HashAlgorithm),
		};

		return tokenDescriptor;
	}
	
	public virtual bool IsAccessTokenExpired(string accessToken)
	{
		var expirationDate = GetExpirationDate(accessToken);
		
		return expirationDate < _dateProvider.Now;
	}

	public async Task<bool> IsPermissionsMetadataOutdatedAsync(string accessToken)
	{
		var jwtSecurityToken = _tokenHandler.ReadJwtToken(accessToken);

		var id = jwtSecurityToken
			.Claims
			.First(x => x.Type.Equals(ClaimTypes.Sid))
			.Value;
		var user = await _userManager.FindByIdAsync(id);

		var tokenRole = jwtSecurityToken
			.Claims
			.First(x => x.Type.Equals("role"))
			.Value;
		var userRole = user.Role.ToString();
		
		return tokenRole != userRole;
	}

	public async Task<JwtPayload> RefreshMetadataAsync(JwtPayload jwtPayload)
	{
		var jwtSecurityToken = _tokenHandler.ReadJwtToken(jwtPayload.AccessToken);
		
		var id = jwtSecurityToken
			.Claims
			.First(x => x.Type.Equals(ClaimTypes.Sid))
			.Value;
		var user = await _userManager.FindByIdAsync(id);
		
		var expirationDate = GetExpirationDate(jwtPayload.AccessToken);
		var tokenDescriptor = CreateAccessTokenDescriptor(user, expirationDate);
		var updateSecurityToken = _tokenHandler.CreateToken(tokenDescriptor);

		var accessToken = _tokenHandler.WriteToken(updateSecurityToken);

		var newJwt = new JwtPayload { RefreshTokenId = jwtPayload.RefreshTokenId, AccessToken = accessToken };

		return newJwt;
	}

	public async Task<JwtPayload> SyncAccessTokenAsync(JwtPayload jwtPayloadDto)
	{
		var refreshToken = await _context
			.Set<UserRefreshToken>()
			.Include(x => x.User)
			.FirstOrDefaultAsync(x => x.Id == jwtPayloadDto.RefreshTokenId);
		if (refreshToken is null)
		{
			throw new SecurityTokenExpiredException("Invalid refresh token");
		}
		
		if (IsAccessTokenExpired(jwtPayloadDto.AccessToken))
		{
			if (refreshToken.IsInvalidated || refreshToken.ExpirationDate < _dateProvider.Now)
			{
				throw new SecurityTokenExpiredException("Invalid refresh token");
			}
			return BuildJwt(refreshToken);
		}

		if (await IsPermissionsMetadataOutdatedAsync(jwtPayloadDto.AccessToken))
		{
			return await RefreshMetadataAsync(jwtPayloadDto);
		}

		return jwtPayloadDto;
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