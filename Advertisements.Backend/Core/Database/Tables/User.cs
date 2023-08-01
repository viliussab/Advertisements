using Core.Database.Converters;
using Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Tables;

public class User : IdentityUser, IModelMetadata
{
    public UserRole Role { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }

    public virtual ICollection<UserRefreshToken> RefreshTokens { get; set; } = new List<UserRefreshToken>();
}

public enum UserRole
{
    Admin,
    Basic,
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(user => user.Role)
            .HasConversion(EnumConverter.Get<UserRole>());
    }
}
