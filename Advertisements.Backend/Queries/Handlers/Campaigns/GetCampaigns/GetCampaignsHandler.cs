using Core.Database;
using Core.Tables.Entities.Campaigns;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Queries.Extensions;
using Queries.Functions;
using Queries.Prototypes;
using Queries.Responses;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaigns;

public class GetCampaignsHandler : BasedHandler<GetCampaignsQuery, PageResponse<CampaignOverview>, GetCampaignsValidator>
{
    private readonly AdvertContext _context;
    
    public GetCampaignsHandler(GetCampaignsValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<PageResponse<CampaignOverview>> Handle(GetCampaignsQuery request, CancellationToken cancellationToken)
    {
        var campaignPage = await _context
            .Set<CampaignTable>()
            .OrderByDescending(x => x.ModificationDate)
            .Include(x => x.CustomerTable)
            .Include(x => x.CampaignPlanes)
            .ToPageAsync(request, cancellationToken);

        var dtoItems = campaignPage
            .Items
            .Select(x =>
        {
            var campaignDetailed = CampaignFunctions.BuildPriceDetailsCampaign(x);
            var dto = x.Adapt<CampaignOverview>();
            dto.WeekCount = campaignDetailed.WeekCount;
            dto.TotalNoVat = campaignDetailed.TotalNoVat;
            
            return dto;
        });

        var dtoPage = campaignPage.Adapt<PageResponse<CampaignOverview>>();
        dtoPage.Items = dtoItems.ToList();

        return dtoPage;
    }
}