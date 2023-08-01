using Core.Database;
using Core.Database.Tables;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.Campaigns.GetCampaignOptions;

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