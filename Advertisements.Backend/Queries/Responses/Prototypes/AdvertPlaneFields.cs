namespace Queries.Responses.Prototypes;

public class AdvertPlaneFields
{
    public Guid Id { get; set; }

    public Guid ObjectId { get; set; }
    
    public string PartialName { get; set; } = string.Empty;

    public bool IsPermitted { get; set; }
        
    public DateTime? PermissionExpiryDate { get; set; }
    
    public DateTime CreationDate { get; set; }
        
    public bool IsPremium { get; set; }
}