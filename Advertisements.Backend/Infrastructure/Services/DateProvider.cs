using Core.Vendor;

namespace Infrastructure.Services;

public class DateProvider : IDateProvider
{
    public DateTime Now => DateTime.UtcNow;
}