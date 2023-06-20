namespace Core.Objects.Models.Areas;

public class Area
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;
    
    public double LongitudeEast { get; set; }
    
    public double LongitudeWest { get; set; }

    public double LatitudeSouth { get; set; }

    public double LatitudeNorth { get; set; }

    public string[] Regions { get; set; } = Array.Empty<string>();
}