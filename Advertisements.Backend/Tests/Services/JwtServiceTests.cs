using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Core.Database;
using Core.Enums;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Tests.Abstractions;

namespace Tests.Services;

[TestFixture]
public class JwtServiceTests
{
	private JwtService _jwtService;
	private UserManager<User> _userManager;
	private AdvertContext _dbContext;
	private IDateProvider _dateProvider;
	private IOptionsMonitor<JwtServiceSettings> _settings;

	[SetUp]
	public void Setup()
	{
		_dbContext = DbContextFactory.Create();
		_userManager = UserManagerFactory.Create(_dbContext);
		var settings = new JwtServiceSettings
		{
			RefreshTokenLifetime = TimeSpan.FromHours(1), Secret = "2274173972575067762504188485098858322880", TokenLifetime = TimeSpan.FromMinutes(30),
		};
		_settings = Substitute.For<IOptionsMonitor<JwtServiceSettings>>();
		_settings.CurrentValue.Returns(settings);

		_dateProvider = new DateProvider();
		_jwtService = new JwtService(_dateProvider, _settings, _userManager, _dbContext);
	}

	[TearDown]
	public void Teardown()
	{
		_dbContext.Database.EnsureDeleted();
	}
	
	[Test]
	public void BuildRefreshToken_ShouldReturnRefreshToken_WhichIsNotInvalidated()
	{
		// Arrange
		var user = new User { Id = Guid.NewGuid().ToString() };

		// Act
		var refreshToken = _jwtService.BuildRefreshToken(user);
		
		// Assert
		refreshToken.IsInvalidated.Should().BeFalse();
	}
	
	[Test]
	public void BuildRefreshToken_ShouldReturnRefreshToken_WhichHasNotExpired()
	{
		// Arrange
		var user = new User { Id = Guid.NewGuid().ToString() };

		// Act
		var refreshToken = _jwtService.BuildRefreshToken(user);
		
		// Assert
		refreshToken.ExpirationDate.Should().BeAfter(_dateProvider.Now);
	}
	
	[Test]
	public void BuildJwt_ShouldReturnValidAccessToken()
	{
		// Arrange
		var user = new User
		{
			Id = Guid.NewGuid().ToString(),
			Role = Role.Admin
		};
		var refreshToken = _jwtService.BuildRefreshToken(user);
		var handler = new JwtSecurityTokenHandler();

		// Act
		var jwtDto = _jwtService.BuildJwt(refreshToken);
		
		// Assert
		Assert.DoesNotThrow(() => handler.ReadJwtToken(jwtDto.AccessToken));
	}
	
	[Test]
	public async Task BuildJwt_ShouldBuildAccessTokenThatHasRoleClaim()
	{
		// Arrange
		var user = await SeedUserAsync();
		var refreshToken = _jwtService.BuildRefreshToken(user);
		
		Claim GetRoleClaims(string accessToken)
		{
			var handler = new JwtSecurityTokenHandler();
			var token = handler.ReadJwtToken(accessToken);
			
			return token.Claims.First(x => x.Type == "role");
		}

		// Act
		var jwtDto = _jwtService.BuildJwt(refreshToken);
		var roleClaims = GetRoleClaims(jwtDto.AccessToken).Value;

		// Assert
		roleClaims.Should().BeEquivalentTo(Role.Admin.ToString());
	}

	[Test]
	public async Task IsAccessTokenExpired_ShouldReturnFalse_WhenAccessTokenIsFreshlyCreated()
	{
		// Arrange
		var user = await SeedUserAsync();
		var refreshToken = _jwtService.BuildRefreshToken(user);
		var jwtDto = _jwtService.BuildJwt(refreshToken);

		// Act
		var result = _jwtService.IsAccessTokenExpired(jwtDto.AccessToken);

		// Assert
		result.Should().BeFalse();
	}
	
	[Test]
	public async Task IsPermissionsMetadataOutdatedAsync_ShouldReturnFalse_WhenUserWasNotUpdated()
	{
		// Arrange
		var user = await SeedUserAsync();
		var refreshToken = _jwtService.BuildRefreshToken(user);
		var jwtDto = _jwtService.BuildJwt(refreshToken);

		// Act
		var result = await _jwtService.IsPermissionsMetadataOutdatedAsync(jwtDto.AccessToken);

		// Assert
		result.Should().BeFalse();
	}
	
	[Test]
	public async Task IsPermissionsMetadataOutdatedAsync_ShouldReturnTrue_WhenUserRolesWereModified()
	{
		// Arrange
		var user = await SeedUserAsync();
		var refreshToken = _jwtService.BuildRefreshToken(user);
		var jwtDto = _jwtService.BuildJwt(refreshToken);

		user.Role = Role.Basic;
		_dbContext.Update(user);
		await _dbContext.SaveChangesAsync();

		// Act
		var result = await _jwtService.IsPermissionsMetadataOutdatedAsync(jwtDto.AccessToken);

		// Assert
		result.Should().BeTrue();
	}
	
	[Test]
	public async Task CreateAccessTokenWithNewMetadataAsync_ShouldReturnToken_ThatHasSameExpirationDateAsOldToken()
	{
		// Arrange
		var user = await SeedUserAsync();
		var refreshToken = _jwtService.BuildRefreshToken(user);
		var jwtDto = _jwtService.BuildJwt(refreshToken);
		var oldTokenClaims = GetClaims(jwtDto.AccessToken);

		// Act
		var newJwt = await _jwtService.RefreshMetadataAsync(jwtDto);
		var newTokenClaims = GetClaims(newJwt.AccessToken);

		var oldExpirationClaim = oldTokenClaims.First(x => x.Type.Equals("exp"));
		var newExpirationClaim = newTokenClaims.First(x => x.Type.Equals("exp"));

		// Assert
		newExpirationClaim.Should().BeEquivalentTo(oldExpirationClaim);
	}

	[Test]
	public async Task SyncAccessTokenAsync_ShouldReturnSameJwt_WhenAccessTokenIsValid()
	{
		// Arrange
		var user = await SeedUserAsync();
		var refreshToken = _jwtService.BuildRefreshToken(user);
		await _dbContext.AddAsync(refreshToken);
		await _dbContext.SaveChangesAsync();
		var jwtDto = _jwtService.BuildJwt(refreshToken);
	
		// Act
		var newJwt = await _jwtService.SyncAccessTokenAsync(jwtDto);
		
		// Assert
		newJwt.Should().BeEquivalentTo(jwtDto);
	}
	
	[Test]
	public async Task SyncAccessTokenAsync_ShouldThrowException_WhenRefreshTokenDoesNotExist()
	{
		// Arrange
		var user = await SeedUserAsync();
		var refreshToken = _jwtService.BuildRefreshToken(user);
		var jwtDto = _jwtService.BuildJwt(refreshToken);
	
		// Assert
		Assert.ThrowsAsync<SecurityTokenExpiredException>(async () =>
			await _jwtService.SyncAccessTokenAsync(jwtDto));
	}
	
	[Test]
	public async Task SyncAccessTokenAsync_ShouldRefreshAccessToken_WhenRolesAreOutdated()
	{
		// Arrange
		var user = await SeedUserAsync();
		var refreshToken = _jwtService.BuildRefreshToken(user);

		await _dbContext.AddAsync(refreshToken);
		await _dbContext.SaveChangesAsync();
		var jwtDto = _jwtService.BuildJwt(refreshToken);

		user.Role = Role.Basic;
		_dbContext.Update(user);
		await _dbContext.SaveChangesAsync();

		// Act
		var newJwt = await _jwtService.SyncAccessTokenAsync(jwtDto);
		
		// Assert
		newJwt.AccessToken.Should().NotBe(jwtDto.AccessToken);
	}
	
	[Test]
	public async Task SyncAccessTokenAsync_ShouldThrowException_WhenAccessAndRefreshTokensAreExpired()
	{
		// Arrange
		var partialJwtServiceMock = Substitute.ForPartsOf<JwtService>(new DateProvider(), _settings, _userManager, _dbContext);

		var user = await SeedUserAsync();
		var refreshToken = partialJwtServiceMock.BuildRefreshToken(user);
		await _dbContext.AddAsync(refreshToken);
		var jwtDto = partialJwtServiceMock.BuildJwt(refreshToken);
		refreshToken.ExpirationDate = DateTime.Now.Subtract(TimeSpan.FromDays(1));
		await _dbContext.SaveChangesAsync();
		partialJwtServiceMock
			.IsAccessTokenExpired(jwtDto.AccessToken)
			.Returns(true);
		
		// Assert
		Assert.ThrowsAsync<SecurityTokenExpiredException>(async () =>
			await partialJwtServiceMock.SyncAccessTokenAsync(jwtDto));
	}
	
	[Test]
	public async Task SyncAccessTokenAsync_ShouldThrowException_WhenAccessTokenIsExpiredAndRefreshTokenIsInvalid()
	{
		// Arrange
		var partialJwtServiceMock = Substitute.ForPartsOf<JwtService>(new DateProvider(), _settings, _userManager, _dbContext);

		var user = await SeedUserAsync();
		var refreshToken = partialJwtServiceMock.BuildRefreshToken(user);
		await _dbContext.AddAsync(refreshToken);
		refreshToken.IsInvalidated = true;
		await _dbContext.SaveChangesAsync();
		var jwtDto = partialJwtServiceMock.BuildJwt(refreshToken);
		
		partialJwtServiceMock
			.IsAccessTokenExpired(jwtDto.AccessToken)
			.Returns(true);
		
		// Assert
		Assert.ThrowsAsync<SecurityTokenExpiredException>(async () =>
			await partialJwtServiceMock.SyncAccessTokenAsync(jwtDto));
	}
	
	[Test]
	public async Task SyncAccessTokenAsync_ShouldCreateNewAccessToken_WhenAccessTokenIsExpired()
	{
		// Arrange
		var partialJwtServiceMock = Substitute.ForPartsOf<JwtService>(new DateProvider(), _settings, _userManager, _dbContext);

		var user = await SeedUserAsync();
		var refreshToken = partialJwtServiceMock.BuildRefreshToken(user);
		await _dbContext.AddAsync(refreshToken);
		await _dbContext.SaveChangesAsync();
		var jwtDto = partialJwtServiceMock.BuildJwt(refreshToken);
		
		partialJwtServiceMock
			.IsAccessTokenExpired(jwtDto.AccessToken)
			.Returns(true);
		
		// Act
		var newJwt = await partialJwtServiceMock.SyncAccessTokenAsync(jwtDto);
		
		// Assert
		newJwt.AccessToken.Should().NotBe(jwtDto.AccessToken);
	}

	private static List<Claim> GetClaims(string accessToken)
	{
		var handler = new JwtSecurityTokenHandler();
		var securityToken = handler.ReadJwtToken(accessToken);

		return securityToken.Claims.ToList();
	}

	private async Task<User> SeedUserAsync()
	{
		var user = new User
		{
			UserName = "admin@reklamosarka.com",
			Email = "admin@reklamosarka.com",
			Role = Role.Admin,
		};
		await _userManager.CreateAsync(user, "Testing1!");

		return user;
	}
}