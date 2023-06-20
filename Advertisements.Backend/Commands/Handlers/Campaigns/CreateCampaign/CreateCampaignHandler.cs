using Commands.Responses;
using Core.Database;
using Core.Tables.Entities.Campaigns;
using Mapster;
using Queries.Prototypes;

namespace Commands.Handlers.Campaigns.CreateCampaign;

public class CreateCampaignHandler : BasedHandler<
    CreateCampaignCommand,
    GuidSuccess,
    CreateCampaignValidator>
{
    private readonly AdvertContext _context;

    public CreateCampaignHandler(CreateCampaignValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public async override Task<GuidSuccess> Handle(CreateCampaignCommand request, CancellationToken cancellationToken)
    {
        var campaign = request.Adapt<CampaignTable>();
        await _context.AddAsync(campaign, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new GuidSuccess(campaign.Id);
    }
}