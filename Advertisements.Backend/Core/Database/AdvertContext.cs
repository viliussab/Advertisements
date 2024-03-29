using Core.Database.Tables;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Core.Database;

public class AdvertContext : IdentityDbContext<User>
{
    private readonly IDateProvider _dateProvider;

    public AdvertContext(DbContextOptions<AdvertContext> options, IDateProvider dateProvider)
        : base(options)
    {
        _dateProvider = dateProvider;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AdvertObjectConfiguration).Assembly);
    }

    public override int SaveChanges()
    {
        AdjustEntityDateFields();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        AdjustEntityDateFields();
        return base.SaveChangesAsync(cancellationToken);
    }
		
    private void AdjustEntityDateFields()
    {
        var changedEntries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is IModelMetadata && e.State is EntityState.Added or EntityState.Modified);

        foreach (var entry in changedEntries)
        {
            var entity = (IModelMetadata)entry.Entity;
            entity.ModificationDate = _dateProvider.Now;
            Entry(entity).Property(x => x.CreationDate).IsModified = false;

            if (entry.State is not EntityState.Added) continue;
            
            entity.CreationDate = _dateProvider.Now;
            Entry(entity).Property(x => x.CreationDate).IsModified = true;
        }
    }
}