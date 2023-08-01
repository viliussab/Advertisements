using API.Queries.Extensions;
using API.Queries.Functions;
using API.Queries.Prototypes;
using API.Queries.Responses;
using API.Queries.Responses.Prototypes;
using Core.Database;
using Core.Database.Tables;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.Campaigns.GetCampaigns;

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
            .Set<Campaign>()
            .OrderByDescending(x => x.ModificationDate)
            .Include(x => x.Customer)
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