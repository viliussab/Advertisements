using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Tables;

public class Area
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public ICollection<AdvertObject> Objects { get; set; } = new List<AdvertObject>();

    [Range(-180, 180)]
    public double LongitudeEast { get; set; }
    
    [Range(-180, 180)]
    public double LongitudeWest { get; set; }

    [Range(-90, 90)]
    public double LatitudeSouth { get; set; }

    [Range(-90, 90)]
    public double LatitudeNorth { get; set; }

    public string[] Regions { get; set; } = Array.Empty<string>();
}

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