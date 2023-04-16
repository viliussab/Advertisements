using Core.Errors;
using MediatR;
using OneOf;
using Queries.Responses;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaignById;

public class GetCampaignByIdQuery : IRequest<OneOf<NotFoundError, CampaignOverview>>
{
    public Guid Id { get; set; }
}