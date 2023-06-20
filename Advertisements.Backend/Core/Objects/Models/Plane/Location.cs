namespace Core.Objects.Models.Plane;

public class Location
{
    public Guid Id { get; set; }
    
    public string SerialCode { get; set; } = string.Empty;
    
    public Guid TypeId { get; set; }
    
    public Guid AreaId { get; set; }
    
    public string Name { get; set; } = string.Empty;
        
    public string Address { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;
    
    public bool Illuminated { get; set; }
        
    public decimal Longitude { get; set; }

    public decimal Latitude { get; set; }
}