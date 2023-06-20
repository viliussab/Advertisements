using Core.Objects.Models.Shared;

namespace Core.Objects.Models.Campaigns;

public class CampaignPlane
{
    public Guid CampaignId { get; set; }

    public Guid PlaneId { get; set; }
    
    public CampaignDate From { get; set; }

    public CampaignDate To { get; set; }
}