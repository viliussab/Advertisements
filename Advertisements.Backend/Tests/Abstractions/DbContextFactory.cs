using Core.Database;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

namespace Tests.Abstractions;

public static class DbContextFactory
{
	public static TestContext Create()
	{
		var optionsBuilder = new DbContextOptionsBuilder<AdvertContext>();
		optionsBuilder.UseInMemoryDatabase("MemoryDatabase");

		return new TestContext(optionsBuilder.Options, new DateProvider());
	}
}