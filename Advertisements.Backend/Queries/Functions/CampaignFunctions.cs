using System.Net.NetworkInformation;
using System.Runtime.CompilerServices;
using Core.Models;
using Mapster;
using Queries.Responses.Prototypes;

namespace Core.Functions;

public class CampaignUnplanned
{
    public double UnitPrice { get; set; } = Constants.UnplannedUnitPrice;
    
    public double TotalPrice { get; set; }
}

public class CampaignPress
{
    public int UnitCount { get; set; }

    public double UnitPrice { get; set; } = Constants.PressUnitPrice;
    
    public double TotalPrice { get; set; }
}

public class CampaignWithPriceDetails : CampaignFields 
{
    public int WeekCount { get; set; }
    
    public CustomerFields Customer { get; set; }
    
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
    private static int CalculateWeekCount(CampaignFields campaign)
    {
        var timeDifference = campaign.End - campaign.Start;

        return (int)Math.Ceiling(timeDifference.TotalDays / 7);
    }

    public static CampaignWithPriceDetails BuildPriceDetailsCampaign(Campaign campaign)
    {
        var c = campaign.Adapt<CampaignWithPriceDetails>();

        c.WeekCount = CalculateWeekCount(c);
        c.WeekPeriod = $"w" +
                       $"{DateFunctions.GetWeekNumber(campaign.Start)}" +
                       $"-" +
                       $"{DateFunctions.GetWeekNumber(campaign.End)}";
        c.PlaneUnitPriceDiscounted = c.PricePerPlane * (1.0 - c.DiscountPercent / 100.0);
        c.PlanesTotalPrice = c.PricePerPlane * c.WeekCount * c.PlaneAmount;
        c.PlanesTotalPriceDiscounted = c.PlaneUnitPriceDiscounted * c.WeekCount * c.PlaneAmount;

        c.Unplanned = campaign.Start.DayOfWeek == Constants.WeekStartDay
            ? null
            : BuildUnplanned(c);
        
        c.Press = campaign.RequiresPrinting
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
            UnitCount = (int)(campaign.PlaneAmount * Constants.PressPrintRatio)
        };
        press.TotalPrice = press.UnitCount * press.UnitPrice;

        return press;
    }
    
    private static CampaignUnplanned BuildUnplanned(CampaignWithPriceDetails campaign)
    {
        var press = new CampaignUnplanned
        {
            TotalPrice = Constants.UnplannedUnitPrice * campaign.PlaneAmount
        };

        return press;
    }
}