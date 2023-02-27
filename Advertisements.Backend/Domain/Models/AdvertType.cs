namespace Domain.Models;

public class AdvertType
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public ICollection<AdvertObject> Object { get; set; } = new List<AdvertObject>();
    
    public string[] Side { get; set; } = null!;
}