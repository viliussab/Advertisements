using Core.Tables.Interfaces;

namespace Core.Tables.Entities.Planes;

public class PlanePhoto : IStoredFile
{
    public Guid Id { get; set; }
    
    public byte[] Content { get; set; }
    
    public string Name { get; set; }
    
    public string Mime { get; set; }
    
    public Guid PlaneId { get; set; }
    
    public virtual PlaneTable PlaneTable { get; set; }
}