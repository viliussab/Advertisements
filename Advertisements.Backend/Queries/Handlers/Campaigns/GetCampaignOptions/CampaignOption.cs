namespace Queries.Handlers.Campaigns.GetCampaigns;

public class CampaignOption
{
    public Guid Id { get; set; }
    
    public string Name { get; set; } = null!;
    
    public DateTime Start { get; set; }

    public DateTime End { get; set; }
}