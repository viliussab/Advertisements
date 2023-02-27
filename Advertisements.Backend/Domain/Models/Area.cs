using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public class Area
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;
    
    [Range(-180, 180)]
    public decimal LongitudeEast { get; set; }
    
    [Range(-180, 180)]
    public decimal LongitudeWest { get; set; }

    [Range(-90, 90)]
    public decimal LatitudeSouth { get; set; }

    [Range(-90, 90)]
    public decimal LatitudeNorth { get; set; }
}