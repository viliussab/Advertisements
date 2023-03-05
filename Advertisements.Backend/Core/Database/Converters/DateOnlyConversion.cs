using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Database.Converters;

public static class DateOnlyConversion
{
    public class Converter : ValueConverter<DateOnly, DateTime>
    {
        public Converter() : base(
            dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),
            dateTime => DateOnly.FromDateTime(dateTime))
        {
        }
    }

    public class Comparer : ValueComparer<DateOnly>
    {
        public Comparer() : base(
            (d1, d2) => d1.DayNumber == d2.DayNumber,
            d => d.GetHashCode())
        {
        }
    }
}