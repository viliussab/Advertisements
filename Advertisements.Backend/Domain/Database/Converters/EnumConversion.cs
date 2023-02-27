using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Domain.Database.Converters;

public static class EnumConversion
{
    public static ValueConverter Get<T>()
        where T : Enum
    {
        var converter = new ValueConverter<T, string>(
            value => value.ToString(),
            value => (T)Enum.Parse(typeof(T), value));

        return converter;
    }
}