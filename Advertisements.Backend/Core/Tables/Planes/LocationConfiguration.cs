using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Tables.Entities.Planes;

public class LocationConfiguration : IEntityTypeConfiguration<LocationTable>
{
    public void Configure(EntityTypeBuilder<LocationTable> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.TypeTable)
            .WithMany(x => x.Objects)
            .HasForeignKey(x => x.TypeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}