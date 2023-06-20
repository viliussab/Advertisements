using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Tables.Entities.Campaigns;

public class CampaignPlaneConfiguration : IEntityTypeConfiguration<CampaignPlaneTable>
{
    public void Configure(EntityTypeBuilder<CampaignPlaneTable> builder)
    {
        builder.HasKey(x => new { x.CampaignId, x.PlaneId, x.WeekTo, x.WeekFrom });
        
        builder.HasOne(x => x.CampaignTable)
            .WithMany(x => x.CampaignPlanes)
            .HasForeignKey(x => x.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.PlaneTable)
            .WithMany(x => x.PlaneCampaigns)
            .HasForeignKey(x => x.PlaneId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}