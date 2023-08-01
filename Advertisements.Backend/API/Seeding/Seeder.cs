using Core.Database;
using Core.Database.Tables;
using Microsoft.AspNetCore.Identity;

namespace API.Seeding;

public static class Seeder
{
    public static async Task Seed(AdvertContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "admin@reklamosarka.com",
                Email = "admin@reklamosarka.com",
                Role = UserRole.Admin,
            };
            await userManager.CreateAsync(user, "Testing1!");
        }
        
        if (!context.Set<Area>().Any())
        {
            context.Add(new Area
            {
                Name = "Kaunas",
                LatitudeNorth = 54.936803,
                LatitudeSouth = 54.857355,
                LongitudeEast = 23.971769,
                LongitudeWest = 23.829046,
                Regions = new [] { 
                    "Šilainiai",
                    "Centras",
                    "Eiguliai",
                    "Dainava", 
                    "Kalniečiai", 
                    "Aleksotas",
                    "Gričiupis",
                    "Panemunė",
                    "Petrašiūnai",
                    "Šančiai",
                    "Vilijampolė",
                    "Žaliakalnis"
                }
            });
        }

        if (!context.Set<AdvertType>().Any())
        {
            context.Add(new AdvertType()
            {
                 Name = "Stotelė",
            });
            
            context.Add(new AdvertType()
            {
                Name = "Vitrina",
            });
        }
        
        if (!context.Set<Customer>().Any())
        {
            context.Add(new Customer
            {
                Name = "Reklamos Arka",
                CompanyCode = "303211411",
                VatCode = "LT100009613214",
                Address = "Tolminkiemio g. 1, LT-48178 Kaunas",
                Phone = "+37068644020",
                ContactPerson = "Vardenis Pavardenis",
                Email = "vardenis@reklamosarka.lt"
            });
        }

        await context.SaveChangesAsync();
    }
}