using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Tables;

public class AdvertType
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public ICollection<AdvertObject> Objects { get; set; } = new List<AdvertObject>();
}

public class AdvertTypeConfiguration : IEntityTypeConfiguration<AdvertType>
{
    public void Configure(EntityTypeBuilder<AdvertType> builder)
    {
        builder.HasKey(x => x.Id);
    }
}