using Core.Database.Configurations;
using Core.Tables.Entities.Planes;
using Core.Tables.Entities.Users;
using Core.Tables.Interfaces;
using Core.Vendor;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Database;

public class AdvertContext : IdentityDbContext<UserTable>
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
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LocationConfiguration).Assembly);
    }

    private static ValueConverter GetEnumConverter<T>()
        where T : Enum
    {
        var converter = new ValueConverter<T, string>(
            value => value.ToString(),
            value => (T)Enum.Parse(typeof(T), value));

        return converter;
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