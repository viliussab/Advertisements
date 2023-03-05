using Core.Models;
using MediatR;

namespace Queries.Handlers.Adverts.GetTypes;

public class GetTypesQuery : IRequest<IEnumerable<AdvertType>>
{
}