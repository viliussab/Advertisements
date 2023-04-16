using Core.Database;
using Core.Errors;
using Core.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace Commands.Handlers.Campaigns.ConfirmCampaign;

public class ConfirmCampaignHandler : IRequestHandler<ConfirmCampaignCommand, OneOf<ConflictError, Unit>>
{
    private readonly AdvertContext _context;

    public ConfirmCampaignHandler(AdvertContext context)
    {
        _context = context;
    }
    
    public async Task<OneOf<ConflictError, Unit>> Handle(ConfirmCampaignCommand request, CancellationToken cancellationToken)
    {
        var campaign = await _context.Set<Campaign>()
            .Include(x => x.CampaignPlanes)
            .FirstAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        var weeks = GetWeeksBetween(campaign.Start, campaign.End);
        var cps = campaign.CampaignPlanes;

        var isFulfilled = weeks.All(week =>
        {
            var weekPlaneCount = cps.Count(x => IsInPlane(x, week));

            return weekPlaneCount == campaign.PlaneAmount;
        });

        if (!isFulfilled)
        {
            return new ConflictError("Not all weeks have planes in them");
        }

        campaign.IsFulfilled = true;
        _context.Update(campaign);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    private static bool IsInPlane(CampaignPlane cp, DateTime week)
    {
        return cp.WeekFrom <= week && cp.WeekTo >= week;
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