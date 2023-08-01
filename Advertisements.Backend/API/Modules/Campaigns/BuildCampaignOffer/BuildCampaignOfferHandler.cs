using API.Pkg.HtmlToPdf;
using API.Queries.Functions;
using API.Queries.Prototypes;
using API.Queries.Responses;
using Core.Database;
using Core.Database.Tables;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.Campaigns.BuildCampaignOffer;

public class BuildCampaignOfferHandler : BasedHandler<BuildCampaignOfferQuery, DownloadFile, BuildCampaignOfferValidator>
{
    private readonly AdvertContext _context;
    private readonly HtmlToPdf _htmlToPdf;

    public BuildCampaignOfferHandler(BuildCampaignOfferValidator validator, AdvertContext context, HtmlToPdf htmlToPdf) : base(validator)
    {
        _context = context;
        _htmlToPdf = htmlToPdf;
    }

    public override async Task<DownloadFile> Handle(BuildCampaignOfferQuery request, CancellationToken cancellationToken)
    {
        var campaign = await _context
            .Set<Campaign>()
            .Include(x => x.Customer)
            .FirstAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        var campaignDetailed = CampaignFunctions.BuildPriceDetailsCampaign(campaign);

        var factory = new BuildCampaignOfferTemplateFactory();

        var html = factory.InitialTemplate;
        html = factory.InjectCustomerRepresentative(html, campaign.Customer, campaign.Name);
        html = factory.InjectTableRows(html, campaignDetailed);
        html = factory.InjectDemoCompanyRepresentative(html);
        html = factory.InjectTotalSums(html, campaignDetailed);
        html = factory.InjectPlaneTooltip(html, campaignDetailed);

        var htmlContent = _htmlToPdf.Convert(html);

        return new DownloadFile
        {
            Content = htmlContent,
            FileName = "offer.pdf",
        };
    }
}