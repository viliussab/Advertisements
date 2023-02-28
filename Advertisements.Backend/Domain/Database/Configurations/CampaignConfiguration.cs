using Domain.Database.Converters;
using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Domain.Database.Configurations;

public class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
{
    public void Configure(EntityTypeBuilder<Campaign> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Customer)
            .WithMany(x => x.Campaigns)
            .HasForeignKey(x => x.CustomerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.ConfirmationStatus)
            .HasConversion(EnumConversion.Get<CampaignConfirmationStatus>());
        
        builder.Property(x => x.Start)
            .HasConversion<DateOnlyConversion.Converter, DateOnlyConversion.Comparer>();
        
        builder.Property(x => x.End)
            .HasConversion<DateOnlyConversion.Converter, DateOnlyConversion.Comparer>();
    }
}