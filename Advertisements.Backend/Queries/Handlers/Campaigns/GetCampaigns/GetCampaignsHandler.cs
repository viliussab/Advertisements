using Core.Database;
using Core.Functions;
using Core.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Queries.Extensions;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaigns;

public class GetCampaignsHandler : BasedHandler<GetCampaignsQuery, PageResponse<GetCampaignsCampaign>, GetCampaignsValidator>
{
    private readonly AdvertContext _context;
    
    public GetCampaignsHandler(GetCampaignsValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<PageResponse<GetCampaignsCampaign>> Handle(GetCampaignsQuery request, CancellationToken cancellationToken)
    {
        var campaignPage = await _context
            .Set<Campaign>()
            .OrderBy(x => x.ModificationDate)
            .Include(x => x.Customer)
            .ToPageAsync(request, cancellationToken);

        var dtoItems = campaignPage
            .Items
            .Select(x =>
        {
            var campaignDetailed = 
                CampaignFunctions.BuildPriceDetailsCampaign(x);
            var dto = campaignDetailed.Adapt<GetCampaignsCampaign>();

            return dto;
        });

        var dtoPage = campaignPage.Adapt<PageResponse<GetCampaignsCampaign>>();
        dtoPage.Items = dtoItems.ToList();

        return dtoPage;
    }
}