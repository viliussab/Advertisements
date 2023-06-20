using Core.Database;
using Core.Tables.Entities.Campaigns;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Queries.Handlers.Campaigns.GetCampaignOptions;

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
            .Set<CampaignTable>()
            .Where(x => !x.IsFulfilled)
            .ToListAsync(cancellationToken: cancellationToken);
        
        var dto = campaigns.Adapt<List<CampaignOption>>();

        return dto;
    }
}