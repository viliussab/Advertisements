using Core.Database;
using Core.Tables.Entities.Campaigns;
using Core.Vendor;
using Microsoft.EntityFrameworkCore;
using Queries.Functions;
using Queries.Prototypes;
using Queries.Responses;

namespace Queries.Handlers.Campaigns.BuildCampaignOffer;

public class BuildCampaignOfferHandler : BasedHandler<BuildCampaignOfferQuery, DownloadFile, BuildCampaignOfferValidator>
{
    private readonly AdvertContext _context;
    private readonly IPdfBuilder _pdfBuilder;

    public BuildCampaignOfferHandler(BuildCampaignOfferValidator validator, AdvertContext context, IPdfBuilder pdfBuilder) : base(validator)
    {
        _context = context;
        _pdfBuilder = pdfBuilder;
    }

    public override async Task<DownloadFile> Handle(BuildCampaignOfferQuery request, CancellationToken cancellationToken)
    {
        var campaign = await _context
            .Set<CampaignTable>()
            .Include(x => x.CustomerTable)
            .FirstAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        var campaignDetailed = CampaignFunctions.BuildPriceDetailsCampaign(campaign);

        var factory = new BuildCampaignOfferTemplateFactory();

        var html = factory.InitialTemplate;
        html = factory.InjectCustomerRepresentative(html, campaign.CustomerTable, campaign.Name);
        html = factory.InjectTableRows(html, campaignDetailed);
        html = factory.InjectDemoCompanyRepresentative(html);
        html = factory.InjectTotalSums(html, campaignDetailed);
        html = factory.InjectPlaneTooltip(html, campaignDetailed);

        var htmlContent = _pdfBuilder.BuildFromHtml(html);

        return new DownloadFile
        {
            Content = htmlContent,
            FileName = "offer.pdf",
        };
    }
}