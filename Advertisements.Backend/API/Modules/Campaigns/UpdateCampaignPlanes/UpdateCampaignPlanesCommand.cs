using MediatR;

namespace API.Modules.Campaigns.UpdateCampaignPlanes;

public class UpdateCampaignPlanesCommand : IRequest
{
    public Guid Id { get; set; }
    
    public List<UpdateCampaignPlanesCommandPlane> CampaignPlanes { get; set; }
}

public class UpdateCampaignPlanesCommandPlane
{
    public Guid PlaneId { get; set; }

    public DateTime WeekFrom { get; set; }

    public DateTime WeekTo { get; set; }
}