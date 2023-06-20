using MediatR;
using Queries.Responses.Prototypes;
using Area = Core.Objects.Models.Areas.Area;

namespace Queries.Handlers.Adverts.GetAreas;

public class GetAreasQuery : IRequest<IEnumerable<Area>>
{
}