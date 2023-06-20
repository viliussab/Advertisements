using Core.Objects.Models.Shared;
using Core.Tables.Interfaces;

namespace Core.Objects.Models.Campaigns;

public class Campaign : IModelMetadata
{
    public Guid Id { get; set; }
    
    public Guid CustomerId { get; set; }

    public string Name { get; set; } = string.Empty;

    public CampaignDate Start { get; set; } = null!;

    public CampaignDate End { get; set; } = null!;
    
    public double PricePerPlane { get; set; }

    public int PlaneAmount { get; set; }
    
    public int? ProvidedPrintUnits { get; set; }

    public int DiscountPercent { get; set; }
    
    public bool IsFulfilled { get; set; }

    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
    
    public ICampaignConfiguration SavedConfiguration { get; set; }
}