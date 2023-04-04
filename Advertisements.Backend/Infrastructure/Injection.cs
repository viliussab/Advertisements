using Commands.Handlers.Adverts.CreateObject;
using Core.Database;
using Core.Interfaces;
using Core.Models;
using FluentValidation;
using Infrastructure.Services;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Queries.Functions;
using Queries.Handlers.Adverts.GetAreas;
using Queries.MapProfiles;

namespace Infrastructure;

public static class Injection
{
	public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddPostgresProvider(configuration);
		services.AddInfrastructureInterfaces();
		services.AddAuthentication();
		services.AddValidatorsFromAssembly(typeof(GetAreasQuery).Assembly);
		services.AddValidatorsFromAssembly(typeof(CreateObjectCommand).Assembly);
	}
	
	private static void AddInfrastructureInterfaces(this IServiceCollection services)
	{ 
		TypeAdapterConfig.GlobalSettings
			.NewConfig<Campaign, CampaignWithPriceDetails>()
			.PreserveReference(true);
			
		TypeAdapterConfig.GlobalSettings.Scan(typeof(StorageFileMapProfile).Assembly);

		services.AddScoped<IJwtService, JwtService>();
		services.AddScoped<IDateProvider, DateProvider>();
		services.AddScoped<IPdfBuilder, PdfBuilder>();
	}

	private static void AddPostgresProvider(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddDbContext<AdvertContext>(options => 
				options.UseNpgsql(
					configuration.GetConnectionString("Database"),
					b => b.MigrationsAssembly("Core")));
		
		AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
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