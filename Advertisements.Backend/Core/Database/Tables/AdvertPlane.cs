using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Tables;

public class AdvertPlane : IModelMetadata
{
    public Guid Id { get; set; }

    public Guid ObjectId { get; set; }

    public virtual AdvertObject Object { get; set; } = null!;

    public virtual ICollection<CampaignPlane> PlaneCampaigns { get; set; } = null!;

    public string PartialName { get; set; } = string.Empty;

    public bool IsPermitted { get; set; }
    
    public DateTime? PermissionExpiryDate { get; set; }
    
    public bool IsPremium { get; set; }
    
    public virtual ICollection<PlanePhoto> Photos { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}

public class AdvertPlaneConfiguration : IEntityTypeConfiguration<AdvertPlane>
{
    public void Configure(EntityTypeBuilder<AdvertPlane> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Object)
            .WithMany(x => x.Planes)
            .HasForeignKey(x => x.ObjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Photos)
            .WithOne(x => x.Plane)
            .HasForeignKey(x => x.PlaneId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

