using MediatR;

namespace Queries.Handlers.Campaigns.GetCampaignsSummary;

public class GetCampaignsSummaryQuery : IRequest<IEnumerable<GetCampaignsSummaryWeeklyResponse>>
{
    public DateTime From { get; set; }

    public DateTime To => From.AddYears(1);
}