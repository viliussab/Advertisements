using API.Queries.Responses;
using MediatR;

namespace API.Modules.Campaigns.BuildCampaignOffer;

public class BuildCampaignOfferQuery : IRequest<DownloadFile>
{
    public Guid Id { get; set; }
}