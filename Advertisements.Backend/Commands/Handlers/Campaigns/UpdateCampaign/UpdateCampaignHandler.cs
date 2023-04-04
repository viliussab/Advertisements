using Commands.Responses;
using Core.Database;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;

namespace Commands.Handlers.Campaigns.UpdateCampaign;

public class UpdateCampaignHandler : BasedHandler<
    UpdateCampaignCommand,
    GuidSuccess,
    UpdateCampaignValidator>
{
    private readonly AdvertContext _context;

    public UpdateCampaignHandler(UpdateCampaignValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override async Task<GuidSuccess> Handle(UpdateCampaignCommand request, CancellationToken cancellationToken)
    {
        var campaign = await _context
            .Set<Campaign>()
            .FirstAsync(x => x.Id == request.Id, cancellationToken);

        campaign.CustomerId = request.CustomerId;
        campaign.Name = request.Name;
        campaign.Start = request.Start;
        campaign.End = request.End;
        campaign.PricePerPlane = request.PricePerPlane;
        campaign.PlaneAmount = request.PlaneAmount;
        campaign.RequiresPrinting = request.RequiresPrinting;
        campaign.DiscountPercent = request.DiscountPercent;
        
        _context.Update(campaign);
        await _context.SaveChangesAsync(cancellationToken);

        return new GuidSuccess(campaign.Id);
    }
}