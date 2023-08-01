using API.Commands.Responses;
using MediatR;

namespace API.Modules.Campaigns.CreateCampaign;

public class CreateCampaignCommand : IRequest<GuidSuccess>
{
    public Guid CustomerId { get; set; }

    public string Name { get; set; }
    
    public DateTime Start { get; set; }

    public DateTime End { get; set; }
    
    public double PricePerPlane { get; set; }

    public int PlaneAmount { get; set; }
    
    public bool RequiresPrinting { get; set; }

    public int DiscountPercent { get; set; }
}