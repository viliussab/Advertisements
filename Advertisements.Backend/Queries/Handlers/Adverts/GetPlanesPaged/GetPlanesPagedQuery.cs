using Core.Models;
using MediatR;
using Queries.Handlers.Adverts.GetAreas;
using Queries.Prototypes;
using Queries.ResponseDto.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedQuery : IRequest<PageResponse<GetPlanesPagedResponse>>, IPageQuery
{
    public Guid? AreaId { get; set; } = null;

    public Guid? TypeId { get; set; } = null;

    public int PageNumber { get; set; } = Constants.Paging.InitialPageNumber;

    public int PageSize { get; set; } = Constants.Paging.DefaultPageSize;
}