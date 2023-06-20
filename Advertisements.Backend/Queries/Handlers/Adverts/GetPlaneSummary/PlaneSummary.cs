using Core.Objects.Models.Campaigns;
using Queries.Handlers.Adverts.GetPlanesPaged;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetPlaneSummary;

public class PlaneSummary : PageResponse<PlaneWithWeeks>
{
    public IEnumerable<DateTime> Weeks { get; set; }
}

public class PlaneWithWeeks : GetPlanesPagedPlane
{
    public List<PlaneWeekCampaign> OccupyingCampaigns { get; set; }
    
}

public class PlaneWeekCampaign : Campaign
{
    public DateTime Week { get; set; }
    
    public List<CampaignPlane> CampaignPlanes { get; set; }
}