using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Configurations;

public class AdvertTypeConfiguration : IEntityTypeConfiguration<AdvertType>
{
    public void Configure(EntityTypeBuilder<AdvertType> builder)
    {
        builder.HasKey(x => x.Id);
    }
}