using API.Queries.Prototypes;
using API.Queries.Responses.Prototypes;
using MediatR;

namespace API.Modules.Billboards.GetPlanesPaged;

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