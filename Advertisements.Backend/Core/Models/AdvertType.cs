namespace Core.Models;

public class AdvertType
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public ICollection<AdvertObject> Objects { get; set; } = new List<AdvertObject>();
}