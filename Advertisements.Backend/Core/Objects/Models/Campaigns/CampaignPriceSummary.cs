namespace Core.Objects.Models.Campaigns;

public class CampaignPriceSummary
{
    public int WeekCount { get; set; }
    
    public string WeekPeriod { get; set; }
    
    public double PlaneUnitPriceDiscounted { get; set; }
    
    public double PlanesTotalPrice { get; set; }
    
    public double PlanesTotalPriceDiscounted { get; set; }
    
    public CampaignUnplanned? Unplanned { get; set; }
    
    public CampaignPress? Press { get; set; }

    public double TotalNoVat { get; set; }
    
    public double TotalVatPortion { get; set; }
    
    public double TotalIncludingVat { get; set; }
}