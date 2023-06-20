using Core.Objects.Models.Campaigns;
using Core.Objects.Models.Customers;
using Queries.Responses.Prototypes;

namespace Queries.Responses;

public class CampaignOverview : Campaign
{
    public int WeekCount { get; set; }
    
    public double TotalNoVat { get; set; }
    
    public int SelectedPlaneAmount { get; set; }
    
    public double WeeklyPrice { get; set; }
    
    public Customer Customer { get; set; }
    
    public List<CampaignPlane> CampaignPlanes { get; set; }
}