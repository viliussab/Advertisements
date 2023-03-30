using Core.Database;
using Core.Errors;
using Core.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;
using OneOf;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetAreaByName;

public class GetAreaByNameHandler : BasedHandler<GetAreaByNameQuery, OneOf<NotFoundError, GetAreaByNameResponse>, GetAreaByNameValidator>
{
    private readonly AdvertContext _context;

    public GetAreaByNameHandler(GetAreaByNameValidator validator, AdvertContext context) : base(validator)
    {
        _context = context;
    }
    
    public override async Task<OneOf<NotFoundError, GetAreaByNameResponse>> Handle(GetAreaByNameQuery request, CancellationToken cancellationToken)
    {
        var area = await _context
            .Set<Area>()
            .Include(x => x.Objects)
                .ThenInclude(x => x.Planes)
                    .ThenInclude(x => x.Photos)
            .Include(x => x.Objects)
                .ThenInclude(x => x.Type)
            .FirstOrDefaultAsync(x => x.Name == request.Name, cancellationToken: cancellationToken);

        if (area is null)
        {
            return new NotFoundError(request.Name, typeof(Area));
        }

        var dto = area.Adapt<GetAreaByNameResponse>();
        
        dto.Objects.ForEach(obj =>
        {
            var advertObject = area.Objects.First(x => x.Id == obj.Id);

            var selectedPlane = advertObject.Planes
                .Where(x => x.Photos.Count != 0)
                .MinBy(plane => plane.PartialName);

            var selectedPhoto = selectedPlane?
                .Photos
                .FirstOrDefault();

            if (selectedPhoto is not null)
            {
                obj.FeaturedPhoto = selectedPhoto.Adapt<FileResponse>();
            }
        });

        return dto;
    }
}