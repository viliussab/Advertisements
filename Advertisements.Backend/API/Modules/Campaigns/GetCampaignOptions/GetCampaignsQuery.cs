using MediatR;

namespace API.Modules.Campaigns.GetCampaignOptions;

public class GetCampaignsOptionsQuery : IRequest<IEnumerable<CampaignOption>>
{
}