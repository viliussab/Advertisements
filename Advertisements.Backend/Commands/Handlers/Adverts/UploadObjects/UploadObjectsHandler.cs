using ClosedXML.Excel;
using Core.Database;
using Core.Tables.Entities.Area;
using Core.Tables.Entities.Planes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;

namespace Commands.Handlers.Adverts.UploadObjects;

public class UploadObjectsHandler : BasedHandler<
    UploadObjectsCommand,
    Unit,
    UploadObjectsValidator>
{
    private readonly AdvertContext _context;

    public UploadObjectsHandler(UploadObjectsValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<Unit> Handle(UploadObjectsCommand request, CancellationToken cancellationToken)
    {
        using var workbook = new XLWorkbook(request.File);

        var sheet = workbook.Worksheet(1);
        var rows = ParseRows(sheet);
        var objectGroups = rows.GroupBy(x => x.SerialCode);

        var types = await _context.Set<PlaneTypeTable>().ToListAsync(cancellationToken: cancellationToken);
        var areas = await _context.Set<Area>().ToListAsync(cancellationToken: cancellationToken);

        foreach (var objectGroup in objectGroups)
        {
            var planes = objectGroup.Select(x => new PlaneTable
            {
                PartialName = x.PartialName,
                IsPermitted = x.License is not null,
                PermissionExpiryDate = x.License.Value.ToUniversalTime(),
                IsPremium = x.IsPremium,
            }).ToList();
            
            var objectRow = objectGroup.First();

            var @object = new LocationTable
            {
                SerialCode = objectRow.SerialCode,
                Name = objectRow.Name!,
                Address = objectRow.Address!,
                TypeId = types.First(x => x.Name == objectRow.Type).Id,
                AreaId = areas.First(x => x.Name == "Kaunas").Id,
                Longitude = objectRow.Longitude!.Value,
                Latitude = objectRow.Latitude!.Value,
                Illuminated = objectRow.Illuminated!.Value,
                Planes = planes,
                Region = objectRow.Region
            };

            await _context.AddAsync(@object, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }

    private class ObjectWorksheetRow
    {
        public string SerialCode { get; set; }
        
        public string? Name { get; set; }
        
        public string? Address { get; set; }
        
        public string? Type { get; set; }
        
        public double? Longitude { get; set; }
        
        public double? Latitude { get; set; }
        
        public bool? Illuminated { get; set; }

        public string PartialName { get; set; } = null!;
        
        public DateTime? License { get; set; }
        
        public bool IsPremium { get; set; }
        
        public string Region { get; set; }
    }
    
    private List<ObjectWorksheetRow> ParseRows(IXLWorksheet worksheet)
    {
        var rows = worksheet.Rows().Skip(1); // Skip Header Row

        var data = rows.Select(row => new ObjectWorksheetRow
        {
            SerialCode = row.Cell(1).GetString(),
            Name = row.Cell(2).IsEmpty() ? null : row.Cell(2).GetString(),
            Address = row.Cell(3).IsEmpty() ? null : row.Cell(3).GetString(),
            Type = row.Cell(4).IsEmpty() ? null : row.Cell(4).GetString(),
            Longitude = row.Cell(5).IsEmpty() ? null : row.Cell(5).GetDouble(),
            Latitude = row.Cell(6).IsEmpty() ? null : row.Cell(6).GetDouble(),
            Illuminated = row.Cell(7).IsEmpty() ? null : row.Cell(7).GetBoolean(),
            PartialName = row.Cell(8).GetString(),
            License = row.Cell(9).IsEmpty() ? null :  row.Cell(9).GetDateTime(),
            IsPremium = row.Cell(10).GetBoolean(),
            Region = row.Cell(11).GetString(),
        }).ToList();
        
        return data;
    }
}