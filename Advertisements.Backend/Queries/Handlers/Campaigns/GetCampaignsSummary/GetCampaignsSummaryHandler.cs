using Core.Database;
using Core.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.Functions;
using Queries.Responses;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaignsSummary;

public class GetCampaignsSummaryHandler : IRequestHandler<GetCampaignsSummaryQuery, IEnumerable<GetCampaignsSummaryWeeklyResponse>>
{
    private readonly AdvertContext _context;

    public GetCampaignsSummaryHandler(AdvertContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<GetCampaignsSummaryWeeklyResponse>> Handle(GetCampaignsSummaryQuery request, CancellationToken cancellationToken)
    {
        var campaigns = await _context
            .Set<Campaign>()
            .Where(x =>
                x.Start >= request.From && x.Start <= request.To
                || x.End >= request.From && x.End <= request.To)
            .Include(x => x.CampaignPlanes)
            .Include(x => x.Customer)
            .ToListAsync(cancellationToken: cancellationToken);

        var planes = await _context
            .Set<AdvertPlane>()
            .Where(x =>
                x.CreationDate <= request.To)
            .ToListAsync(cancellationToken: cancellationToken);

        var weekDates = GetWeeksBetween(request.From, request.To).ToList();

        var weeklyCampaigns = weekDates.Select(week =>
        {
            var weeklySummary = new GetCampaignsSummaryWeeklyResponse
            {
                Week = week,
            };
            var campaignsOfWeek = campaigns
                .Where(x =>
                    x.Start <= week.AddDays(6)
                    && x.End >= week)
                .ToList();
            

            weeklySummary.Campaigns = campaignsOfWeek.Select(c =>
            {
                var details = CampaignFunctions.BuildPriceDetailsCampaign(c);
                var dto = details.Adapt<CampaignOverview>();
                
                dto.WeeklyPrice = GetWeeklyPrice(c, details, week);
                dto.Customer = c.Customer.Adapt<CustomerFields>();
                dto.CampaignPlanes = c.CampaignPlanes.Adapt<List<CampaignPlaneFields>>();

                return dto;
            }).ToList();

            weeklySummary.ConfirmedTotalPrice = weeklySummary.Campaigns
                .Where(x => x.IsFulfilled)
                .Sum(x => x.WeeklyPrice);
            weeklySummary.PlanesConfirmedTotalCount = weeklySummary.Campaigns
                .Where(x => x.IsFulfilled)
                .Sum(x => x.CampaignPlanes.Count);
            
            weeklySummary.ReservedTotalPrice = weeklySummary.Campaigns.Sum(x => x.WeeklyPrice);
            weeklySummary.PlanesReservedTotalCount = weeklySummary.Campaigns.Sum(x => x.CampaignPlanes.Count);

            weeklySummary.PlaneTotalCount = planes
                .Count(x => x.CreationDate <= week.AddDays(6));

            return weeklySummary;
        });

        return weeklyCampaigns;
    }

    private static double GetWeeklyPrice(Campaign campaign, CampaignWithPriceDetails priceDetails,  DateTime week)
    { 
        var weekPrice = campaign.PricePerPlane
                        * (1.0 - campaign.DiscountPercent / 100.0)
                        * campaign.PlaneAmount;

        if (campaign.Start != week)
        {
            return weekPrice;
        }

        var includedPrice = weekPrice
                            + (priceDetails.Unplanned?.TotalPrice ?? 0)
                            + (priceDetails.Press?.TotalPrice ?? 0);

        return includedPrice;
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