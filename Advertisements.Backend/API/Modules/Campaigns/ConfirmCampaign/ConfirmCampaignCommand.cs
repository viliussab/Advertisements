using API.Pkg.Errors;
using MediatR;
using OneOf;

namespace API.Modules.Campaigns.ConfirmCampaign;

public class ConfirmCampaignCommand : IRequest<OneOf<ConflictError, Unit>>
{
    public Guid Id { get; set; }
}