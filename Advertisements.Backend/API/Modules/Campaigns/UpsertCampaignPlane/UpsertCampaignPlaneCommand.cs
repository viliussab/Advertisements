using MediatR;

namespace API.Modules.Campaigns.UpsertCampaignPlane;

public class UpsertCampaignPlaneCommand : IRequest
{
    public Guid CampaignId { get; set; }
    
    public Guid PlaneId { get; set; }

    public DateTime WeekFrom { get; set; }

    public DateTime WeekTo { get; set; }
}