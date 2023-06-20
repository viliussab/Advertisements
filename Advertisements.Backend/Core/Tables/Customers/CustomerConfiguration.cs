using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Tables.Entities.Customers;

public class CustomerConfiguration : IEntityTypeConfiguration<CustomerTable>
{
    public void Configure(EntityTypeBuilder<CustomerTable> builder)
    {
        builder.HasKey(x => x.Id);
    }
}