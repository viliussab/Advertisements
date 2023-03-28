using Core.Models;
using MediatR;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetAreas;

public class GetAreasQuery : IRequest<IEnumerable<AreaFields>>
{
}