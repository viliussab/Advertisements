namespace Domain.Interfaces;

public interface IDateProvider
{
    DateTime Now { get; }
}