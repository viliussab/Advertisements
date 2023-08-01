using System.Text;
using System.Text.Json.Serialization;
using API.Launch;
using API.Pkg.Jwt;
using API.Pkg.NetHttp.Middlewares;
using API.Seeding;
using Core;
using Core.Database;
using Core.Database.Tables;
using Core.Launch;
using Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions<JwtServiceSettings>()
    .Bind(builder.Configuration.GetSection(JwtServiceSettings.SectionName))
    .ValidateOnStart();

builder.Services.AddLogging(logging => logging.AddConsole());

CoreInjection.Inject(builder.Services, builder.Configuration);
ServiceInjection.Inject(builder.Services);

builder.Services
    .AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services
    .AddAuthorization();

SwaggerInjection.Inject(builder.Services);

var jwtSettings = builder.Services
    .BuildServiceProvider()
    .GetService<IOptionsMonitor<JwtServiceSettings>>();

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings!.CurrentValue.Secret)),
        ValidateIssuer = false,
        ValidateAudience = false,
        RequireExpirationTime = true,
        ValidateLifetime = true,
    };
});

var app = builder.Build();

app.UseMiddleware<JwtCookieMiddleware>();

    app.UseCors(options =>
        options.SetIsOriginAllowed(_ => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithExposedHeaders("Access-Control-Allow-Origin")
            .WithExposedHeaders("Content-Disposition"));


app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Advertisements.API v1"));

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetService<AdvertContext>()!;
    var userManager = scope.ServiceProvider.GetService<UserManager<User>>()!;
    await Seeder.Seed(context, userManager);
}

app.Run();