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
    
    public DateOnly Start { get; set; }

    public DateOnly End { get; set; }

    public int SideCount { get; set; }
    
    public bool CustomerProvidesPrinting { get; set; }

    [Range(0, 100)]
    public int DiscountPercent { get; set; }

    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}