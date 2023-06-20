using Core.Objects.Models.Campaigns;
using Core.Objects.Models.Other;
using Core.Objects.Models.Shared;

namespace Core.Services;

public static class CampaignPriceCalculator
{
    private static CampaignUnplanned? BuildUnplannedOrDefault(Campaign campaign)
    {
        var configuration = campaign.SavedConfiguration;
        
        if (campaign.Start.WeekDay == configuration.WeekStartDay
            && campaign.End.WeekDay == configuration.WeekEndDay)
        {
            return null;
        }
        
        int CalculateDateExpense(CampaignDate date)
        {
            if (date.WeekDay == configuration.WeekStartDay)
            {
                return 0;
            }

            return date.WeekDay is >= DayOfWeek.Monday and <= DayOfWeek.Friday 
                ? configuration.UnplannedWorkDayPrice 
                : configuration.UnplannedWorkWeekPrice;
        }

        var unitPrice = CalculateDateExpense(campaign.Start);
        unitPrice += CalculateDateExpense(campaign.End);
        
        return new CampaignUnplanned
        {
            TotalPrice = unitPrice * campaign.PlaneAmount,
            UnitPrice = unitPrice
        };
    }
    
    private static CampaignPress? BuildPressOrDefault(Campaign campaign)
    {
        if (campaign.ProvidedPrintUnits is null)
        {
            return null;
        }

        var price = campaign.SavedConfiguration.PrintPrice;
        
        var press = new CampaignPress
        {
            ProvidedPrintUnits = campaign.ProvidedPrintUnits.Value,
            UnitPrice = price,
            TotalPrice = price * campaign.ProvidedPrintUnits.Value
        };

        return press;
    }
    
    private static int CalculateWeekCount(Campaign campaign)
    {
        var timeDifference = campaign.End - campaign.Start;

        return (int)Math.Ceiling(timeDifference.TotalDays / 7) + 1;
    }

    public static CampaignPriceSummary BuildPriceDetailsOrDefault(Campaign campaign)
    {
        var summary = new CampaignPriceSummary
        {
            WeekCount = CalculateWeekCount(campaign),
            WeekPeriod = $"w" +
                         $"{campaign.Start.CalendarWeek}" +
                         $"-" +
                         $"{campaign.Start.CalendarWeek}",
            PlaneUnitPriceDiscounted = campaign.PricePerPlane * (1.0 - campaign.DiscountPercent / 100.0)
        };

        summary.PlanesTotalPrice = campaign.PricePerPlane * summary.WeekCount * campaign.PlaneAmount;
        summary.PlanesTotalPriceDiscounted = summary.PlaneUnitPriceDiscounted * summary.WeekCount * campaign.PlaneAmount;

        summary.Unplanned = BuildUnplannedOrDefault(campaign);
        summary.Press = BuildPressOrDefault(campaign);

        summary.TotalNoVat = summary.PlanesTotalPriceDiscounted
                       + (summary.Press?.TotalPrice ?? 0)
                       + (summary.Unplanned?.TotalPrice ?? 0);
        summary.TotalVatPortion = summary.TotalNoVat * campaign.SavedConfiguration.VatPercent;
        summary.TotalIncludingVat = summary.TotalNoVat + summary.TotalVatPortion;

        return summary;
    }
}