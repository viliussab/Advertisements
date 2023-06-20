using Core.Tables.Entities.Planes;

namespace Core.Tables.Entities.Campaigns;

public class CampaignPlaneTable
{
    public Guid CampaignId { get; set; }

    public virtual CampaignTable CampaignTable { get; set; } = null!;
    
    public Guid PlaneId { get; set; }

    public virtual PlaneTable PlaneTable { get; set; } = null!;
    
    public DateTime WeekFrom { get; set; }

    public DateTime WeekTo { get; set; }
}