using Queries.Responses.Prototypes;

namespace Queries.Responses;

public class CampaignOverview : CampaignFields
{
    public int WeekCount { get; set; }
    
    public double TotalNoVat { get; set; }
    
    public int SelectedPlaneAmount { get; set; }
    
    public CustomerFields Customer { get; set; }
    
    public List<CampaignPlaneFields> CampaignPlanes { get; set; }
}