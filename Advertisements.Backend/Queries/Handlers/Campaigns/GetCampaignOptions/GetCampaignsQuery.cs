using MediatR;
using Queries.Prototypes;
using Queries.Responses;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaigns;

public class GetCampaignsOptionsQuery : IRequest<IEnumerable<CampaignOption>>
{
}