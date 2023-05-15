using Core.Database;
using Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Tests.Abstractions;

public class UserManagerFactory
{
	public static UserManager<User> Create(AdvertContext context)
	{
		var store = new UserStore<User, IdentityRole, AdvertContext>(context);
		
		using var loggerFactory = LoggerFactory.Create(loggingBuilder => loggingBuilder
			.SetMinimumLevel(LogLevel.Trace));

		var logger = loggerFactory.CreateLogger<UserManager<User>>();
		
		var instance = new UserManager<User>(
			store, null, new PasswordHasher<User>(), null, null, null, null, null, logger);

		instance.ErrorDescriber = new IdentityErrorDescriber();
		instance.UserValidators.Add(new UserValidator<User>());
		instance.PasswordValidators.Add(new PasswordValidator<User>());
		var resetTokenProvider = Substitute.For<IUserTwoFactorTokenProvider<User>>();
		resetTokenProvider.GenerateAsync(Arg.Any<string>(), instance, Arg.Any<User>())
			.Returns("generatedToken123");
		resetTokenProvider
			.ValidateAsync(Arg.Any<string>(), "generatedToken123", instance, Arg.Any<User>())
			.Returns(true);
		instance.RegisterTokenProvider(TokenOptions.DefaultProvider, resetTokenProvider);

		return instance;
	}

	public static UserManager<User> CreateMock()
	{
		var store = Substitute.For<IUserStore<User>>();
		var manager = Substitute.For<UserManager<User>>(
			store,
			null,
			new PasswordHasher<User>(), 
			null,
			null,
			null,
			null,
			null, 
			null);

		return manager;
	}
}