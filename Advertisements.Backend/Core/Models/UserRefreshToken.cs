namespace Core.Models;

public class UserRefreshToken : IModelMetadata
{
	public Guid Id { get; set; }
	
	public DateTime ExpirationDate { get; set; }

	public virtual User User { get; set; } = null!;

	public string UserId { get; set; } = null!;

	public bool IsInvalidated { get; set; } = false;

	public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}