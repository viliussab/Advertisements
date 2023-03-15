using System.Text.Json.Serialization;
using Commands.Handlers.Adverts.CreateObject;
using Core.Database;
using Infrastructure;
using Infrastructure.Seeding;
using Infrastructure.Services;
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



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors(options =>
        options.SetIsOriginAllowed(_ => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithExposedHeaders("Content-Disposition"));
}

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Advertisements.API v1"));

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetService<AdvertContext>()!;
    await Seeder.Seed(context);
}



app.Run();