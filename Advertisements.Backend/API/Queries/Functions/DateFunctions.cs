using System.Globalization;

namespace API.Queries.Functions;

public static class DateFunctions
{
    public static int GetWeekNumber(DateTime date)
    {
        return CultureInfo
            .InvariantCulture
            .Calendar
            .GetWeekOfYear(date, CalendarWeekRule.FirstFourDayWeek, Constants.WeekStartDay);
    }
}