using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Configurations;

public class AreaConfiguration : IEntityTypeConfiguration<Area>
{
    public void Configure(EntityTypeBuilder<Area> builder)
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