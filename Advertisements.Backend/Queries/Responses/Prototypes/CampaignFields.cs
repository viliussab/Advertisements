namespace Queries.Responses.Prototypes;

public class CampaignFields
{
    public Guid Id { get; set; }
    
    public Guid CustomerId { get; set; }

    public string Name { get; set; }
    
    public DateTime Start { get; set; }

    public DateTime End { get; set; }
    
    public double PricePerPlane { get; set; }

    public int PlaneAmount { get; set; }
    
    public bool RequiresPrinting { get; set; }

    public int DiscountPercent { get; set; }
}