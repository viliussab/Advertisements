using Core.Database;
using Core.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.Extensions;
using Queries.Functions;
using Queries.Prototypes;
using Queries.Responses;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaigns;

public class GetCampaignsOptionsHandler : IRequestHandler<GetCampaignsOptionsQuery, IEnumerable<CampaignOption>>
{
    private readonly AdvertContext _context;
    
    public GetCampaignsOptionsHandler(AdvertContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CampaignOption>> Handle(GetCampaignsOptionsQuery request, CancellationToken cancellationToken)
    {
        var campaigns = await _context
            .Set<Campaign>()
            .Where(x => !x.IsFulfilled)
            .ToListAsync(cancellationToken: cancellationToken);
        
        var dto = campaigns.Adapt<List<CampaignOption>>();

        return dto;
    }
}