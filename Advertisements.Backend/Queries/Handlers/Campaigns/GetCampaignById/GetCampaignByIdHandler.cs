using Core.Database;
using Core.Errors;
using Core.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OneOf;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaignById;

public class GetCampaignByIdHandler : BasedHandler<GetCampaignByIdQuery, OneOf<NotFoundError, CampaignFields>, GetCampaignByIdValidator>
{
    private readonly AdvertContext _context;


    public GetCampaignByIdHandler(GetCampaignByIdValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<OneOf<NotFoundError, CampaignFields>> Handle(GetCampaignByIdQuery request, CancellationToken cancellationToken)
    {
        var campaign = await _context
            .Set<Campaign>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        if (campaign is null)
        {
            return new NotFoundError(request.Id, typeof(Campaign));
        }

        var dto = campaign.Adapt<CampaignFields>();

        return dto;
    }
}