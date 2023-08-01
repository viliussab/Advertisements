using API.Pkg.Errors;
using API.Queries.Responses;
using MediatR;
using OneOf;

namespace API.Modules.Campaigns.GetCampaignById;

public class GetCampaignByIdQuery : IRequest<OneOf<NotFoundError, CampaignOverview>>
{
    public Guid Id { get; set; }
}