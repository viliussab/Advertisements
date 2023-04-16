namespace Core.Models;

public class CampaignPlane
{
    public Guid CampaignId { get; set; }

    public virtual Campaign Campaign { get; set; } = null!;
    
    public Guid PlaneId { get; set; }

    public virtual AdvertPlane Plane { get; set; } = null!;
    
    public DateTime WeekFrom { get; set; }

    public DateTime WeekTo { get; set; }
}