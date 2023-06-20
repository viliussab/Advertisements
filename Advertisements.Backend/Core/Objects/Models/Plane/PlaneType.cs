namespace Core.Objects.Models.Plane;

public class PlaneType
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string[] PlaneSides = Array.Empty<string>();
    
    public bool AllowSerialization { get; set; }
}