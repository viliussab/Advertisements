using Core.Database;
using Core.Tables.Entities.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Tests.Abstractions;

public class SignInManagerFactory
{
	public static SignInManager<UserTable> CreateMock(AdvertContext context)
	{
		var mock = Substitute.For<SignInManager<UserTable>>(
			UserManagerFactory.Create(context),
			Substitute.For<IHttpContextAccessor>(),
			Substitute.For<IUserClaimsPrincipalFactory<UserTable>>(),
			null,
			null,
			null,
			null);

		return mock;
	}
}