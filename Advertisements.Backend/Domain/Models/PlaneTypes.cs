namespace Domain.Models;

public class PlaneTypes
{
    public Guid Id { get; set; }
    
    public DateOnly Date { get; set; }
    
    public virtual Guid OwnerId { get; set; }
    
    public virtual ICollection<AdvertPlane> Owner { get; set; } = null!;
    
    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}