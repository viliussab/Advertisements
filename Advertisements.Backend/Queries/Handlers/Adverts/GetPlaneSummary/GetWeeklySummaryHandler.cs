using Core.Database;
using Core.Tables.Entities.Planes;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.Extensions;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetPlaneSummary;

public class GetWeeklySummaryHandler : IRequestHandler<GetWeeklySummaryQuery, PlaneSummary>
{
    private readonly AdvertContext _context;

    public GetWeeklySummaryHandler(AdvertContext context)
    {
        _context = context;
    }
    
    public async Task<PlaneSummary> Handle(GetWeeklySummaryQuery request, CancellationToken cancellationToken)
    {
        var queryable = _context.Set<PlaneTable>()
            .Where(plane => request.Name == null
                            || EF.Functions.ILike(plane.Object.Name + " " + plane.PartialName, $"%{request.Name}%"))
            .Where(plane => request.Address == null
                            || EF.Functions.ILike(plane.Object.Address, $"%{request.Address}%"))
            .Where(plane => request.Side == null
                            || EF.Functions.ILike(plane.PartialName, $"%{request.Side}%"))
            .Where(plane => request.Region == null
                            || plane.Object.Region == request.Region)
            .Where(plane => request.Premium == null
                            || plane.IsPremium == request.Premium);
 
        var pagedPlanes = await queryable
            .Include(x => x.Object)
            .Include(x => x.Object.TypeTable)
            .Include(x => x.Object.Area)
            .Include(x => x.PlaneCampaigns)
                .ThenInclude(x => x.CampaignTable)
            .OrderBy(x => x.Object.CreationDate)
            .ToPageAsync(request, cancellationToken);
        
        var weekDates = GetWeeksBetween(request.From, request.To).ToList();
        
        var dto = pagedPlanes.Adapt<PlaneSummary>();
        dto.Weeks = weekDates;
        
        dto.Items.ForEach(x =>
        {
            var plane = pagedPlanes.Items.First(plane => plane.Id == x.Id);

            x.OccupyingCampaigns = weekDates
                .Select(date => GetWeekForPlaneOrDefault(date, plane))
                .Where(weekCampaign => weekCampaign is not null)
                .ToList()!;
        });

        return dto;
    }

    private static PlaneWeekCampaign? GetWeekForPlaneOrDefault(DateTime date, PlaneTable planeTable)
    {
        var campaignOrDefault = planeTable
            .PlaneCampaigns
            .FirstOrDefault(cp => cp.WeekFrom <= date && cp.WeekTo >= date)
            ?.CampaignTable;

        if (campaignOrDefault is null)
        {
            return null;
        }

        var dto = campaignOrDefault.Adapt<PlaneWeekCampaign>();
        dto.Week = date;
        dto.CampaignPlanes = dto.CampaignPlanes.Where(x => x.PlaneId == planeTable.Id).ToList();

        return dto;
    }

    private static IEnumerable<DateTime> GetWeeksBetween(DateTime from, DateTime to)
    {
        for (var current = from.Date;
             current.Date <= to.Date;
             current = current.AddDays(7))
        {
            yield return current;
        }
    }
}