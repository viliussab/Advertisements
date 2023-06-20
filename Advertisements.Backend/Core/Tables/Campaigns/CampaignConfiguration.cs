using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Tables.Entities.Campaigns;

public class CampaignConfiguration : IEntityTypeConfiguration<CampaignTable>
{
    public void Configure(EntityTypeBuilder<CampaignTable> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.CustomerTable)
            .WithMany(x => x.Campaigns)
            .HasForeignKey(x => x.CustomerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}