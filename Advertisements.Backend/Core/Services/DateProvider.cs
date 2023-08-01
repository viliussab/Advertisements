namespace Core.Services;

public interface IDateProvider
{
    DateTime Now { get; }
}

public class DateProvider : IDateProvider
{
    public DateTime Now => DateTime.UtcNow;
}