using Core.Database;
using Core.Models;

namespace Infrastructure.Seeding;

public static class Seeder
{
    public static async Task Seed(AdvertContext context)
    {
        if (!context.Set<Area>().Any())
        {
            context.Add(new Area
            {
                Name = "Kaunas",
                LatitudeNorth = 54.936803M,
                LatitudeSouth = 54.857355M,
                LongitudeEast = 23.971769M,
                LongitudeWest = 23.829046M,
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

        await context.SaveChangesAsync();
    }
}