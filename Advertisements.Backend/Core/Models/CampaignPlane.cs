namespace Core.Models;

public class CampaignPlane
{
    public Guid CampaignId { get; set; }

    public virtual Campaign Campaign { get; set; } = null!;
    
    public Guid PlaneId { get; set; }

    public virtual AdvertPlane Plane { get; set; } = null!;

    public int WeekFrom { get; set; }

    public int WeekTo { get; set; }
}