using Core.Database.Converters;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Configurations;

public class AdvertPlaneConfiguration : IEntityTypeConfiguration<AdvertPlane>
{
    public void Configure(EntityTypeBuilder<AdvertPlane> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Object)
            .WithMany(x => x.Planes)
            .HasForeignKey(x => x.ObjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.PermittedExpiryDate)
            .HasConversion<DateOnlyConversion.Converter, DateOnlyConversion.Comparer>();
    }
}