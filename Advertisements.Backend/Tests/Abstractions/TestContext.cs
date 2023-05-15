using Core.Database;
using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Tests.Abstractions;

public class TestContext : AdvertContext
{
    public TestContext(DbContextOptions<AdvertContext> options, IDateProvider dateProvider) : base(options, dateProvider)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
            
        modelBuilder.Entity<Area>()
            .Property(i => i.Regions)
            .HasConversion(
                v => string.Join("'", v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
        
    }
}