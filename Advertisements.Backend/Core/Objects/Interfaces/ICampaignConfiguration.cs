namespace Core.Tables.Interfaces;

public interface ICampaignConfiguration
{
    public int UnplannedWorkDayPrice { get; set; }
    
    public int UnplannedWorkWeekPrice { get; set; }
    
    public double PlanePrice { get; set; }

    public int PrintPrice { get; set; }

    public double AdditionalPrintPercent { get; set; }

    public double VatPercent { get; set; }

    public DayOfWeek WeekStartDay { get; set; }
    
    public DayOfWeek WeekEndDay { get; set; }
}