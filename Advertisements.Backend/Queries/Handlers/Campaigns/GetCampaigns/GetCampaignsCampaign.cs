using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaigns;

public class GetCampaignsCampaign : CampaignFields
{
    public int WeekCount { get; set; }
    
    public double TotalNoVat { get; set; }
    
    public CustomerFields Customer { get; set; }
}