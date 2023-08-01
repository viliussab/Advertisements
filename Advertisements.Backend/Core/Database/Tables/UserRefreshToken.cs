using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Tables;

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


public class UserRefreshTokenConfiguration : IEntityTypeConfiguration<UserRefreshToken>
{
	public void Configure(EntityTypeBuilder<UserRefreshToken> builder)
	{
		builder.HasKey(x => x.Id);

		builder.HasOne(x => x.User)
			.WithMany(x => x.RefreshTokens)
			.HasForeignKey(x => x.UserId)
			.OnDelete(DeleteBehavior.Cascade);
	}
}