using Core.Database;
using Core.Tables.Entities.Area;
using Core.Tables.Entities.Customers;
using Core.Tables.Entities.Planes;
using Core.Tables.Entities.Users;
using Core.Tables.Enums;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Seeding;

public static class Seeder
{
    public static async Task Seed(AdvertContext context, UserManager<UserTable> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new UserTable
            {
                UserName = "admin@reklamosarka.com",
                Email = "admin@reklamosarka.com",
                Role = Role.Admin,
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

        if (!context.Set<PlaneTypeTable>().Any())
        {
            context.Add(new PlaneTypeTable()
            {
                 Name = "Stotelė",
            });
            
            context.Add(new PlaneTypeTable()
            {
                Name = "Vitrina",
            });
        }
        
        if (!context.Set<CustomerTable>().Any())
        {
            context.Add(new CustomerTable
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