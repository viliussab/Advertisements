using Core.Database;
using Core.Tables.Entities.Campaigns;
using MediatR;

namespace Commands.Handlers.Campaigns.UpsertCampaignPlane;

public class UpsertCampaignPlaneHandler : IRequestHandler<UpsertCampaignPlaneCommand>
{
    private readonly AdvertContext _context;

    public UpsertCampaignPlaneHandler(AdvertContext context)
    {
        _context = context;
    }
    
    public async Task Handle(UpsertCampaignPlaneCommand request, CancellationToken cancellationToken)
    {
        await _context.AddAsync(new CampaignPlaneTable
        {
            CampaignId = request.CampaignId,
            PlaneId = request.PlaneId,
            WeekFrom = request.WeekFrom,
            WeekTo = request.WeekTo,
        }, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }
}