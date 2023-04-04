using Core.Database;
using Queries.Prototypes;
using Queries.Responses;

namespace Queries.Handlers.Campaigns.BuildCampaignOffer;

public class BuildCampaignOfferHandler : BasedHandler<BuildCampaignOfferQuery, DownloadFile, BuildCampaignOfferValidator>
{
    private readonly AdvertContext _context;

    public BuildCampaignOfferHandler(BuildCampaignOfferValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }

    public override Task<DownloadFile> Handle(BuildCampaignOfferQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}