using MediatR;

namespace Commands.Handlers.Campaigns.UpdateCampaignPlane;

public class UpsertCampaignPlaneCommand : IRequest
{
    public Guid CampaignId { get; set; }
    
    public Guid PlaneId { get; set; }

    public DateTime WeekFrom { get; set; }

    public DateTime WeekTo { get; set; }
}