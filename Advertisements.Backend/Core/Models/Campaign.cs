using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Core.Models;

public class Campaign : IModelMetadata
{
    public Guid Id { get; set; }
    
    public virtual ICollection<CampaignPlane> CampaignPlanes { get; set; } = new List<CampaignPlane>();
    
    public Guid CustomerId { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public CampaignConfirmationStatus ConfirmationStatus { get; set; } = CampaignConfirmationStatus.Draft;

    public string Name { get; set; } = null!;
    
    public DateTime Start { get; set; }

    public DateTime End { get; set; }
    
    public double PricePerPlane { get; set; }

    public int PlaneAmount { get; set; }
    
    public bool RequiresPrinting { get; set; }

    [Range(0, 100)]
    public int DiscountPercent { get; set; }

    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}