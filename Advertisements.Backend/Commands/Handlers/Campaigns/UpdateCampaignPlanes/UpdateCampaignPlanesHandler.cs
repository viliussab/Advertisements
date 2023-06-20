using Commands.Responses;
using Core.Database;
using Core.Tables.Entities.Campaigns;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Handlers.Campaigns.UpdateCampaignPlanes;

public class UpdateCampaignPlanesHandler : IRequestHandler<UpdateCampaignPlanesCommand>
{
    private readonly AdvertContext _context;

    public UpdateCampaignPlanesHandler(AdvertContext context)
    {
        _context = context;
    }
    
    public async Task Handle(UpdateCampaignPlanesCommand request, CancellationToken cancellationToken)
    {
        var deleteCps = await _context.Set<CampaignPlaneTable>()
            .Where(x => x.CampaignId == request.Id)
            .ToListAsync(cancellationToken);
        
        _context.RemoveRange(deleteCps);

        var addCps = request.CampaignPlanes.Select(cp =>
        {
            var x = cp.Adapt<CampaignPlaneTable>();
            x.CampaignId = request.Id;

            return x;
        }).ToList();
        await _context.AddRangeAsync(addCps, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }
}