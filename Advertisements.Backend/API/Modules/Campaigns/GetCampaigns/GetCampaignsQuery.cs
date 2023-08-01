using API.Queries.Prototypes;
using API.Queries.Responses;
using API.Queries.Responses.Prototypes;
using MediatR;

namespace API.Modules.Campaigns.GetCampaigns;

public class GetCampaignsQuery : IRequest<PageResponse<CampaignOverview>>, IPageQuery
{
    public int PageNumber { get; set; }
    
    public int PageSize { get; set; }
}