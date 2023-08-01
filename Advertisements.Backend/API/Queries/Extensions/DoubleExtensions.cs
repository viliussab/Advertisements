using System.Globalization;

namespace API.Queries.Extensions;

public static class DoubleExtensions
{
    public static string ToMonetaryString(this double value)
    {
        return Math.Round(value, 2).ToString(CultureInfo.InvariantCulture);
    }
}