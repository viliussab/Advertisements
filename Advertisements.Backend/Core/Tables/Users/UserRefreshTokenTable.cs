using Core.Tables.Interfaces;

namespace Core.Tables.Entities.Users;

public class UserRefreshTokenTable : IModelMetadata
{
	public Guid Id { get; set; }
	
	public DateTime ExpirationDate { get; set; }

	public virtual UserTable UserTable { get; set; } = null!;

	public string UserId { get; set; } = null!;

	public bool IsInvalidated { get; set; } = false;

	public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}