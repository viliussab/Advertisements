using Core.Models;
using MediatR;

namespace Queries.Handlers.Adverts.GetAreas;

public class GetAreasQuery : IRequest<IEnumerable<Area>>
{
}