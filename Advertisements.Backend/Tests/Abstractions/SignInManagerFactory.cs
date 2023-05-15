using Core.Database;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Tests.Abstractions;

public class SignInManagerFactory
{
	public static SignInManager<User> CreateMock(AdvertContext context)
	{
		var mock = Substitute.For<SignInManager<User>>(
			UserManagerFactory.Create(context),
			Substitute.For<IHttpContextAccessor>(),
			Substitute.For<IUserClaimsPrincipalFactory<User>>(),
			null,
			null,
			null,
			null);

		return mock;
	}
}