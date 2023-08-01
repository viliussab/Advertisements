using API.Modules.Billboards.CreateObject;
using API.Modules.Billboards.GetAreas;
using API.Pkg.HtmlToPdf;
using API.Pkg.Jwt;
using API.Queries.Functions;
using API.Queries.MapProfiles;
using Core.Database.Tables;
using Core.Models;
using FluentValidation;
using Mapster;

namespace API.Launch;

public static class ServiceInjection
{
	public static void Inject(IServiceCollection services)
	{
		services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<GetAreasQuery>());
		services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CreateObjectCommand>());
		services.AddInfrastructureInterfaces();
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
		services.AddScoped<HtmlToPdf>();
	}
}