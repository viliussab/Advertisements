using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Tables;

public class AdvertObject : IModelMetadata
{
    public Guid Id { get; set; }
    
    public string SerialCode { get; set; } = string.Empty;

    public virtual ICollection<AdvertPlane> Planes { get; set; } = new List<AdvertPlane>();
    
    public Guid AreaId { get; set; }

    public virtual Area Area { get; set; } = null!;
    
    public Guid TypeId { get; set; }

    public virtual AdvertType Type { get; set; } = null!;

    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;
    
    public bool Illuminated { get; set; }
    
    public double Longitude { get; set; }
    
    public double Latitude { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}

public class AdvertObjectConfiguration : IEntityTypeConfiguration<AdvertObject>
{
    public void Configure(EntityTypeBuilder<AdvertObject> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Type)
            .WithMany(x => x.Objects)
            .HasForeignKey(x => x.TypeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
