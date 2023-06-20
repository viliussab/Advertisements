using Core.Tables.Entities.Campaigns;
using Mapster;
using Queries.Responses.Prototypes;
using Campaign = Core.Objects.Models.Campaigns.Campaign;

namespace Queries.Functions;


public class CampaignWithPriceDetails : Core.Objects.Models.Campaigns.Campaign 
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

public static class CampaignFunctions
{
    private static int CalculateWeekCount(Campaign campaign)
    {
        var timeDifference = campaign.End - campaign.Start;

        return (int)Math.Ceiling(timeDifference.TotalDays / 7) + 1;
    }

    public static CampaignWithPriceDetails BuildPriceDetailsCampaign(CampaignTable campaignTable)
    {
        var c = campaignTable.Adapt<CampaignWithPriceDetails>();

        c.WeekCount = CalculateWeekCount(c);
        c.WeekPeriod = $"w" +
                       $"{DateFunctions.GetWeekNumber(campaignTable.Start)}" +
                       $"-" +
                       $"{DateFunctions.GetWeekNumber(campaignTable.End)}";
        c.PlaneUnitPriceDiscounted = c.PricePerPlane * (1.0 - c.DiscountPercent / 100.0);
        c.PlanesTotalPrice = c.PricePerPlane * c.WeekCount * c.PlaneAmount;
        c.PlanesTotalPriceDiscounted = c.PlaneUnitPriceDiscounted * c.WeekCount * c.PlaneAmount;

        c.Unplanned = campaignTable.Start.DayOfWeek == Constants.WeekStartDay
            ? null
            : BuildUnplanned(c);
        
        c.Press = campaignTable.RequiresPrinting
            ? BuildPress(c)
            : null;

        c.TotalNoVat = c.PlanesTotalPriceDiscounted
                       + (c.Press?.TotalPrice ?? 0)
                       + (c.Unplanned?.TotalPrice ?? 0);
        c.TotalVatPortion = c.TotalNoVat * Constants.Vat;
        c.TotalIncludingVat = c.TotalNoVat + c.TotalVatPortion;

        return c;
    }

    private static CampaignPress BuildPress(CampaignWithPriceDetails campaign)
    {
        var press = new CampaignPress
        {
            UnitCount = (int)Math.Round(campaign.PlaneAmount * Constants.PressPrintRatio, 0)
        };
        press.TotalPrice = press.UnitCount * press.UnitPrice;

        return press;
    }
    

}