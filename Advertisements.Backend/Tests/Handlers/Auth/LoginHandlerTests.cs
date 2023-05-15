using Commands.Handlers.Auth.Login;
using Core.Components;
using Core.Database;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Tests.Abstractions;

namespace Tests.Handlers;

[TestFixture]
public class LoginHandlerTests
{
    private LoginHandler _handler;
	private SignInManager<User> _signInManager;
	private AdvertContext _dbContext;
	private UserManager<User> _userManager;
	private IJwtService _jwtService;

	[SetUp]
	public void Setup()
	{
		_dbContext = DbContextFactory.Create();
		_userManager = UserManagerFactory.Create(_dbContext);
		_signInManager = SignInManagerFactory.CreateMock(_dbContext);
		_jwtService = Substitute.For<IJwtService>();
		_handler = new LoginHandler(_signInManager, _userManager, _jwtService, _dbContext);
	}
	
	[TearDown]
	public void Teardown()
	{
		_dbContext.Database.EnsureDeleted();
	}

	[Test]
	public void Handle_ThrowsException_WhenUserIsNotFound()
	{
		// Arrange
		const string nonExistingEmail = "non-existing@gmail.com";
		var command = new LoginCommand { Email = nonExistingEmail };

		// Act
		async Task HandleDelegate() => await _handler.Handle(command, CancellationToken.None);
		
		// Assert
		Assert.ThrowsAsync<Exception>(HandleDelegate, "No such email found");
	}
	
	[Test]
	public async Task Handle_ThrowsException_WhenCredentialAreIncorrect()
	{
		// Arrange
		var user = await SeedUserAsync();
		var command = new LoginCommand
		{
			Email = user.Email,
			Password = "Testing1!"
		};
		
		_signInManager.PasswordSignInAsync(user, command.Password, false, false)
			.Returns(SignInResult.Failed);
		
		// Act
		async Task HandleDelegate() => await _handler.Handle(command, CancellationToken.None);

		// Assert
		Assert.ThrowsAsync<Exception>(HandleDelegate, "Incorrect email password combination");
	}

	[Test]
	public async Task Handle_CreatesRefreshToken_WhenCredentialAreCorrect()
	{
		// Arrange
		var user = await SeedUserAsync();
		var command = new LoginCommand { Email = user.Email, Password = "Testing1!"};

		_signInManager.PasswordSignInAsync(user, command.Password, false, false)
			.Returns(SignInResult.Success);
		
		var refreshToken = new UserRefreshToken { User = user, ExpirationDate = DateTime.Now, IsInvalidated = false };
		_jwtService.BuildRefreshToken(Arg.Any<User>())
			.Returns(refreshToken);
		_jwtService.BuildJwt(Arg.Any<UserRefreshToken>())
			.Returns(new Jwt { AccessToken = "accessToken", RefreshTokenId = Guid.NewGuid() });

		// Act
		await _handler.Handle(command, CancellationToken.None);
		var savedRefreshToken = await _dbContext.Set<UserRefreshToken>().FirstOrDefaultAsync();
		
		// Assert
		savedRefreshToken.Should().NotBeNull();
	}
	
	private async Task<User> SeedUserAsync()
	{
		var user = new User
		{
			Email = "demo@gmail.com",
			UserName = "demo@gmail.com",
		};
		const string password = "Testing1!";
		await _userManager.CreateAsync(user, password);

		return user;
	}
}