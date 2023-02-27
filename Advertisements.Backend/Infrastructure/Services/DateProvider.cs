using Domain.Interfaces;

namespace Infrastructure.Services;

public class DateProvider : IDateProvider
{
    public DateTime Now => DateTime.UtcNow;
}