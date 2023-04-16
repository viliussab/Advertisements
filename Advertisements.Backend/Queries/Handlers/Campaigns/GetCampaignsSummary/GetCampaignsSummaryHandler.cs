using MediatR;

namespace Queries.Handlers.Campaigns.GetCampaignsSummary;

public class GetCampaignsSummaryHandler : IRequestHandler<GetCampaignsSummaryQuery, IEnumerable<GetCampaignsSummaryWeeklyResponse>>
{
    public Task<IEnumerable<GetCampaignsSummaryWeeklyResponse>> Handle(GetCampaignsSummaryQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}