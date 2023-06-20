using System.Globalization;
using Core.Objects.Models.Shared;
using Core.Tables.Interfaces;

namespace Core.Services;

public class CampaignDateConverter
{
    public DateTime ToDate(CampaignDate date, ICampaignConfiguration configuration)
    {
        ISOWeek.ToDateTime(date.Year, date.CalendarWeek, date.WeekDay);
    }
}