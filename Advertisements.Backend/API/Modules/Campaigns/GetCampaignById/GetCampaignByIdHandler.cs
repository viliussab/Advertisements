using API.Pkg.Errors;
using API.Queries.Functions;
using API.Queries.Prototypes;
using API.Queries.Responses;
using Core.Database;
using Core.Database.Tables;
using Mapster;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace API.Modules.Campaigns.GetCampaignById;

public class GetCampaignByIdHandler : BasedHandler<GetCampaignByIdQuery, OneOf<NotFoundError, CampaignOverview>, GetCampaignByIdValidator>
{
    private readonly AdvertContext _context;
    
    public GetCampaignByIdHandler(GetCampaignByIdValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<OneOf<NotFoundError, CampaignOverview>> Handle(GetCampaignByIdQuery request, CancellationToken cancellationToken)
    {
        var campaign = await _context
            .Set<Campaign>()
            .Include(x => x.CampaignPlanes)
            .Include(x => x.Customer)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        if (campaign is null)
        {
            return new NotFoundError(request.Id, typeof(Campaign));
        }
        
        var campaignDetailed = CampaignFunctions.BuildPriceDetailsCampaign(campaign);
        var dto = campaign.Adapt<CampaignOverview>();
        dto.WeekCount = campaignDetailed.WeekCount;
        dto.TotalNoVat = campaignDetailed.TotalNoVat;

        return dto;
    }
}