using System.Globalization;
using System.Runtime.InteropServices.JavaScript;
using Core.Objects.Models.Campaigns;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Objects.Models.Shared;

public class CampaignDate
{
    public int CalendarWeek { get; set; }
    
    public int Year { get; set; }
    
    public DayOfWeek WeekDay { get; set; }
    

}