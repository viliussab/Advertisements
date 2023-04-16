namespace Queries.Responses.Prototypes;

public class CampaignPlaneFields
{
    public Guid CampaignId { get; set; }

    public Guid PlaneId { get; set; }
    
    public DateTime WeekFrom { get; set; }

    public DateTime WeekTo { get; set; }
}