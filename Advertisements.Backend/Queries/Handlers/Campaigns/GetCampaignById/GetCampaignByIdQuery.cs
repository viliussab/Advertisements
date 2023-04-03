using Core.Errors;
using MediatR;
using OneOf;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Campaigns.GetCampaignById;

public class GetCampaignByIdQuery : IRequest<OneOf<NotFoundError, CampaignFields>>
{
    public Guid Id { get; set; }
}