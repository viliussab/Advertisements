namespace Core.Tables.Entities.Planes;

public class PlaneTypeTable
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public ICollection<LocationTable> Objects { get; set; } = new List<LocationTable>();
}