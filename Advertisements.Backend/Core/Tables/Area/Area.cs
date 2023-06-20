using System.ComponentModel.DataAnnotations;
using Core.Tables.Entities.Planes;

namespace Core.Tables.Entities.Area;

public class Area
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public ICollection<LocationTable> Objects { get; set; } = new List<LocationTable>();

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