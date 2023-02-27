using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Domain.Database.Configurations;

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