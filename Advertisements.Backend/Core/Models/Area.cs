using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Core.Models;

public class Area
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public ICollection<AdvertObject> Objects { get; set; } = new List<AdvertObject>();

    [Range(-180, 180)]
    public double LongitudeEast { get; set; }
    
    [Range(-180, 180)]
    public double LongitudeWest { get; set; }

    [Range(-90, 90)]
    public double LatitudeSouth { get; set; }

    [Range(-90, 90)]
    public double LatitudeNorth { get; set; }

    public string[] Regions { get; set; } = Array.Empty<string>();
}