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

        await context.SaveChangesAsync();
    }
}