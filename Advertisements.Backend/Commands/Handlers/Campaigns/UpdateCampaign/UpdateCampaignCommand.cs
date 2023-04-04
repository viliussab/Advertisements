using Commands.Responses;
using MediatR;

namespace Commands.Handlers.Campaigns.CreateCampaign;

public class UpdateCampaignCommand : CreateCampaignCommand
{
    public Guid Id { get; set; }
}