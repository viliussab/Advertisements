using API.Modules.Campaigns.CreateCampaign;

namespace API.Modules.Campaigns.UpdateCampaign;

public class UpdateCampaignCommand : CreateCampaignCommand
{
    public Guid Id { get; set; }
}