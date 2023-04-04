using Commands.Handlers.Campaigns.CreateCampaign;

namespace Commands.Handlers.Campaigns.UpdateCampaign;

public class UpdateCampaignCommand : CreateCampaignCommand
{
    public Guid Id { get; set; }
}