using Core.Database;
using Core.Database.Tables;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Launch;

public static class CoreInjection
{
    public static void Inject(IServiceCollection services, IConfiguration configuration)
    {
        services.AddPostgresProvider(configuration);
        services.AddAuthentication();
        services.AddScoped<IDateProvider, DateProvider>();
    }
    
    private static void AddPostgresProvider(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AdvertContext>(options => 
            options.UseNpgsql(
                configuration.GetConnectionString("Database"),
                b => b.MigrationsAssembly("Core")));
    }
    
    private static void AddAuthentication(this IServiceCollection services)
    {
        services
            .AddIdentity<User, IdentityRole>()
            .AddEntityFrameworkStores<AdvertContext>()
            .AddDefaultTokenProviders();
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