using Core.Database.Tables;
using MediatR;

namespace API.Modules.Billboards.GetTypes;

public class GetTypesQuery : IRequest<IEnumerable<AdvertType>>
{
}