using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Database.Converters;

public static class EnumConverter
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