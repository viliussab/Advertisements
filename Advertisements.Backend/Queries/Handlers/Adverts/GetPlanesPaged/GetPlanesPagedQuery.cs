using Core.Models;
using MediatR;
using Queries.Prototypes;
using Queries.ResponseDto.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedQuery : IRequest<PageResponse<AdvertPlane>>, IPageQuery
{
    public Guid? AreaId { get; set; } = null;

    public Guid? TypeId { get; set; } = null;

    public string Search { get; set; } = string.Empty;

    public string? Side { get; set; } = null;
    
    public int PageNumber { get; set; } = Constants.Paging.InitialPageNumber;

    public int PageSize { get; set; } = Constants.Paging.DefaultPageSize;
}