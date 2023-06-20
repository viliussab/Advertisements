using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Tables.Entities.Users;

public class UserRefreshTokenConfiguration : IEntityTypeConfiguration<UserRefreshTokenTable>
{
    public void Configure(EntityTypeBuilder<UserRefreshTokenTable> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.UserTable)
            .WithMany(x => x.RefreshTokens)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}