using MediatR;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaigns;

public class GetCampaignsQuery : IRequest<PageResponse<GetCampaignsCampaign>>, IPageQuery
{
    public int PageNumber { get; set; }
    
    public int PageSize { get; set; }
}