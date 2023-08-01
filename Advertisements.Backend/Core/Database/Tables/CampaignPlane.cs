using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Tables;

public class CampaignPlane
{
    public Guid CampaignId { get; set; }

    public virtual Campaign Campaign { get; set; } = null!;
    
    public Guid PlaneId { get; set; }

    public virtual AdvertPlane Plane { get; set; } = null!;
    
    public DateTime WeekFrom { get; set; }

    public DateTime WeekTo { get; set; }
}

public class CampaignPlaneConfiguration : IEntityTypeConfiguration<CampaignPlane>
{
    public void Configure(EntityTypeBuilder<CampaignPlane> builder)
    {
        builder.HasKey(x => new { x.CampaignId, x.PlaneId, x.WeekTo, x.WeekFrom });
        
        builder.HasOne(x => x.Campaign)
            .WithMany(x => x.CampaignPlanes)
            .HasForeignKey(x => x.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Plane)
            .WithMany(x => x.PlaneCampaigns)
            .HasForeignKey(x => x.PlaneId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}