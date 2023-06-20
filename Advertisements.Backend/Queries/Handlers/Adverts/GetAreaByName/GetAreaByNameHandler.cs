using Core.Database;
using Core.Errors;
using Mapster;
using Microsoft.EntityFrameworkCore;
using OneOf;
using Queries.Prototypes;
using Queries.Responses.Prototypes;
using Area = Core.Tables.Entities.Area.Area;

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
            .Include(x => x.Objects)
                .ThenInclude(x => x.TypeTable)
            .FirstOrDefaultAsync(x => x.Name == request.Name, cancellationToken: cancellationToken);

        if (area is null)
        {
            return new NotFoundError(request.Name, typeof(Area));
        }

        var dto = area.Adapt<GetAreaByNameResponse>();

        return dto;
    }
}