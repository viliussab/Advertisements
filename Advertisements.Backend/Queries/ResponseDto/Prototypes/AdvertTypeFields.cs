namespace Queries.Dtos.Prototypes;

public class AdvertTypeFields
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string[] Side { get; set; } = null!;
}