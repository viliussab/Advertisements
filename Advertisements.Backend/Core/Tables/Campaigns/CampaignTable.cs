using System.ComponentModel.DataAnnotations;
using Core.Objects.Models.Campaigns;
using Core.Tables.Entities.Customers;
using Core.Tables.Interfaces;

namespace Core.Tables.Entities.Campaigns;

public class CampaignTable : Campaign, IModelMetadata
{
    public virtual ICollection<CampaignPlaneTable> CampaignPlanes { get; set; } = new List<CampaignPlaneTable>();
    
    public virtual CustomerTable CustomerTable { get; set; } = null!;
    
    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}