namespace Core.Models;

public class PlanePhoto : IStoredFile
{
    public Guid Id { get; set; }
    
    public byte[] Content { get; set; }
    
    public string Name { get; set; }
    
    public string Mime { get; set; }
    
    public Guid PlaneId { get; set; }
    
    public virtual AdvertPlane Plane { get; set; }
}