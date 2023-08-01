using API.Queries.Responses;

namespace API.Modules.Campaigns.GetCampaignsSummary;

public class GetCampaignsSummaryWeeklyResponse
{
    public List<CampaignOverview> Campaigns { get; set; }
    
    public DateTime Week { get; set; }
    
    public double ReservedTotalPrice { get; set; }
    
    public double ConfirmedTotalPrice { get; set; }
    
    public int PlanesConfirmedTotalCount { get; set; }
    
    public int PlanesReservedTotalCount { get; set; }

    public int PlaneTotalCount { get; set; }

    public int PlaneFreeTotalCount => PlaneTotalCount - PlanesReservedTotalCount;

    public int PlaneOccupancyPercent => 100 * PlanesConfirmedTotalCount / (PlaneTotalCount != 0 ? PlaneTotalCount : int.MaxValue);
}