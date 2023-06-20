using MediatR;
using Queries.Handlers.Adverts.GetAreas;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedQuery : IRequest<PageResponse<GetPlanesPagedPlane>>, IPageQuery
{
    public string? Name { get; set; }
    
    public string? Address { get; set; }
    
    public string? Side { get; set; }
    
    public string? Region { get; set; }
    
    public bool? Illuminated { get; set; }
    
    public bool? Premium { get; set; }

    public int PageNumber { get; set; }

    public int PageSize { get; set; }
}