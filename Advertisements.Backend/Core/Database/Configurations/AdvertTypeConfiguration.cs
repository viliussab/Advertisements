using Core.Tables.Entities.Planes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Configurations;

public class AdvertTypeConfiguration : IEntityTypeConfiguration<PlaneTypeTable>
{
    public void Configure(EntityTypeBuilder<PlaneTypeTable> builder)
    {
        builder.HasKey(x => x.Id);
    }
}