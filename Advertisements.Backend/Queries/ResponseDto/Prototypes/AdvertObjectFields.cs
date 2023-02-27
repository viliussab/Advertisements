namespace Queries.Dtos.Prototypes;

public class AdvertObjectFields
{
    public Guid Id { get; set; }
    
    public string SerialCode { get; set; } = string.Empty;
    
    public virtual Guid TypeId { get; set; }
    
    public string Name { get; set; } = string.Empty;
        
    public string Address { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;
        
    public decimal Longitude { get; set; }

    public decimal Latitude { get; set; }
}