using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Tables.Entities.Planes;

public class PlaneConfiguration : IEntityTypeConfiguration<PlaneTable>
{
    public void Configure(EntityTypeBuilder<PlaneTable> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Object)
            .WithMany(x => x.Planes)
            .HasForeignKey(x => x.ObjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Photos)
            .WithOne(x => x.PlaneTable)
            .HasForeignKey(x => x.PlaneId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}