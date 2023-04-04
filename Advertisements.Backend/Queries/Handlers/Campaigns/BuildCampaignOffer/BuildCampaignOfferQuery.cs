using MediatR;
using Queries.Responses;

namespace Queries.Handlers.Campaigns.BuildCampaignOffer;

public class BuildCampaignOfferQuery : IRequest<DownloadFile>
{
    public Guid Id { get; set; }
}