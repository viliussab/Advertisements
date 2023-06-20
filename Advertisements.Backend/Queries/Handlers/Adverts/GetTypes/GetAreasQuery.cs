using Core.Tables.Entities.Planes;
using MediatR;

namespace Queries.Handlers.Adverts.GetTypes;

public class GetTypesQuery : IRequest<IEnumerable<PlaneTypeTable>>
{
}