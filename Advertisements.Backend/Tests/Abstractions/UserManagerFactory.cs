using Core.Database;
using Core.Tables.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Tests.Abstractions;

public class UserManagerFactory
{
	public static UserManager<UserTable> Create(AdvertContext context)
	{
		var store = new UserStore<UserTable, IdentityRole, AdvertContext>(context);
		
		using var loggerFactory = LoggerFactory.Create(loggingBuilder => loggingBuilder
			.SetMinimumLevel(LogLevel.Trace));

		var logger = loggerFactory.CreateLogger<UserManager<UserTable>>();
		
		var instance = new UserManager<UserTable>(
			store, null, new PasswordHasher<UserTable>(), null, null, null, null, null, logger);

		instance.ErrorDescriber = new IdentityErrorDescriber();
		instance.UserValidators.Add(new UserValidator<UserTable>());
		instance.PasswordValidators.Add(new PasswordValidator<UserTable>());
		var resetTokenProvider = Substitute.For<IUserTwoFactorTokenProvider<UserTable>>();
		resetTokenProvider.GenerateAsync(Arg.Any<string>(), instance, Arg.Any<UserTable>())
			.Returns("generatedToken123");
		resetTokenProvider
			.ValidateAsync(Arg.Any<string>(), "generatedToken123", instance, Arg.Any<UserTable>())
			.Returns(true);
		instance.RegisterTokenProvider(TokenOptions.DefaultProvider, resetTokenProvider);

		return instance;
	}

	public static UserManager<UserTable> CreateMock()
	{
		var store = Substitute.For<IUserStore<UserTable>>();
		var manager = Substitute.For<UserManager<UserTable>>(
			store,
			null,
			new PasswordHasher<UserTable>(), 
			null,
			null,
			null,
			null,
			null, 
			null);

		return manager;
	}
}