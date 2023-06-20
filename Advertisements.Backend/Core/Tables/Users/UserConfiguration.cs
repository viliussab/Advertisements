using Core.Database.Converters;
using Core.Tables.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Tables.Entities.Users;

public class UserConfiguration : IEntityTypeConfiguration<UserTable>
{
    public void Configure(EntityTypeBuilder<UserTable> builder)
    {
        builder.Property(user => user.Role)
            .HasConversion(EnumConversion.Get<Role>());
    }
}