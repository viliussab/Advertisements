using MediatR;

namespace Queries.Handlers.Campaigns.GetCampaignOptions;

public class GetCampaignsOptionsQuery : IRequest<IEnumerable<CampaignOption>>
{
}