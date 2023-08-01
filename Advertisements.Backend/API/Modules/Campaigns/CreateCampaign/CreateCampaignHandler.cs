using API.Commands.Responses;
using Core.Database;
using Core.Database.Tables;
using Mapster;
using MediatR;

namespace API.Modules.Campaigns.CreateCampaign;

public class CreateCampaignHandler : IRequestHandler<
    CreateCampaignCommand,
    GuidSuccess> 
{
    private readonly AdvertContext _context;

    public CreateCampaignHandler(AdvertContext context)
    {
        _context = context;
    }

    public async Task<GuidSuccess> Handle(CreateCampaignCommand request, CancellationToken cancellationToken)
    {
        var campaign = request.Adapt<Campaign>();
        await _context.AddAsync(campaign, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new GuidSuccess(campaign.Id);
    }
}