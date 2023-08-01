using System.ComponentModel.DataAnnotations;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Database.Tables;

public class Campaign : IModelMetadata
{
    public Guid Id { get; set; }
    
    public virtual ICollection<CampaignPlane> CampaignPlanes { get; set; } = new List<CampaignPlane>();
    
    public Guid CustomerId { get; set; }

    public virtual Customer Customer { get; set; } = null!;
    
    public string Name { get; set; } = null!;
    
    public DateTime Start { get; set; }

    public DateTime End { get; set; }
    
    public double PricePerPlane { get; set; }

    public int PlaneAmount { get; set; }
    
    public bool RequiresPrinting { get; set; }
    
    public bool IsFulfilled { get; set; } = false;

    [Range(0, 100)]
    public int DiscountPercent { get; set; }

    public DateTime CreationDate { get; set; }
    
    public DateTime ModificationDate { get; set; }
}

public class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
{
    public void Configure(EntityTypeBuilder<Campaign> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Customer)
            .WithMany(x => x.Campaigns)
            .HasForeignKey(x => x.CustomerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}