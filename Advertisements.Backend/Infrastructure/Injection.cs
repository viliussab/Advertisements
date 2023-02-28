using Domain.Database;
using Domain.Interfaces;
using Domain.Models;
using FluentValidation;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class Injection
{
	public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddPostgresProvider(configuration);
		services.AddInfrastructureInterfaces();
		services.AddAuthentication();
		services.AddValidatorsFromAssembly(typeof(Injection).Assembly);
	}
	
	private static void AddInfrastructureInterfaces(this IServiceCollection services)
	{
		services.AddScoped<IJwtService, JwtService>();
		services.AddScoped<IDateProvider, DateProvider>();
	}

	private static void AddPostgresProvider(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddDbContext<AdvertContext>(options => 
				options.UseNpgsql(
					configuration.GetConnectionString("Database"),
					b => b.MigrationsAssembly("Domain")));
	}
	
	private static void AddAuthentication(this IServiceCollection services)
	{
		services
			.AddIdentityCore<User>()
			.AddEntityFrameworkStores<AdvertContext>();
		services.Configure<IdentityOptions>(options =>
		{
			options.Password.RequireDigit = true;
			options.Password.RequireNonAlphanumeric = false;
			options.Password.RequireUppercase = true;
			options.Password.RequiredLength = 8;
			options.User.RequireUniqueEmail = true;
		});
	}
}