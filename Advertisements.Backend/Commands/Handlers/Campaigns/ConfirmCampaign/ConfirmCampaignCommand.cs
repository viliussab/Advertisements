using Core.Errors;
using MediatR;
using OneOf;

namespace Commands.Handlers.Campaigns.ConfirmCampaign;

public class ConfirmCampaignCommand : IRequest<OneOf<ConflictError, Unit>>
{
    public Guid Id { get; set; }
}