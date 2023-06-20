using System.Text;
using System.Text.Json.Serialization;
using API.Middlewares;
using Commands.Handlers.Adverts.CreateObject;
using Core.Database;
using Core.Tables.Entities.Users;
using Infrastructure;
using Infrastructure.Seeding;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Queries.Handlers.Adverts.GetAreas;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions<JwtServiceSettings>()
    .Bind(builder.Configuration.GetSection(JwtServiceSettings.SectionName))
    .ValidateOnStart();

builder.Services.AddLogging(logging => logging.AddConsole());
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<GetAreasQuery>());
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CreateObjectCommand>());
builder.Services.AddAuthorization();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Advertisements.API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer",
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        },
    });
});

var jwtSettings = builder.Services.BuildServiceProvider().GetService<IOptionsMonitor<JwtServiceSettings>>();

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
    var userManager = scope.ServiceProvider.GetService<UserManager<UserTable>>()!;
    await Seeder.Seed(context, userManager);
}

app.Run();