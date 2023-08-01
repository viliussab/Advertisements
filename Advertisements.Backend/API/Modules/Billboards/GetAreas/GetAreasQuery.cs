using API.Queries.Responses.Prototypes;
using MediatR;

namespace API.Modules.Billboards.GetAreas;

public class GetAreasQuery : IRequest<IEnumerable<AreaFields>>
{
}