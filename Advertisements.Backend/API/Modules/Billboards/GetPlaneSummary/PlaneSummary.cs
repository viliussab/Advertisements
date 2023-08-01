using API.Modules.Billboards.GetPlanesPaged;
using API.Queries.Responses.Prototypes;

namespace API.Modules.Billboards.GetPlaneSummary;

public class PlaneSummary : PageResponse<PlaneWithWeeks>
{
    public IEnumerable<DateTime> Weeks { get; set; }
}

public class PlaneWithWeeks : GetPlanesPagedPlane
{
    public List<PlaneWeekCampaign> OccupyingCampaigns { get; set; }
    
}

public class PlaneWeekCampaign : CampaignFields
{
    public DateTime Week { get; set; }
    
    public List<CampaignPlaneFields> CampaignPlanes { get; set; }
}