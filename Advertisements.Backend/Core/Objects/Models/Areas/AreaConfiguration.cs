using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Objects.Models.Areas;

public class AreaConfiguration : IEntityTypeConfiguration<Tables.Entities.Area.Area>
{
    public void Configure(EntityTypeBuilder<Tables.Entities.Area.Area> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.LatitudeNorth)
            .HasPrecision(7);
        
        builder.Property(x => x.LatitudeSouth)
            .HasPrecision(7);
        
        builder.Property(x => x.LongitudeEast)
            .HasPrecision(7);
        
        builder.Property(x => x.LongitudeWest)
            .HasPrecision(7);
    }
}