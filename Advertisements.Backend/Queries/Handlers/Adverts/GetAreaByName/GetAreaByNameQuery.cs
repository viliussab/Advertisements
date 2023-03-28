using Core.Errors;
using MediatR;
using OneOf;

namespace Queries.Handlers.Adverts.GetAreas;

public class GetAreaByNameQuery : IRequest<OneOf<NotFoundError, GetAreaByNameResponse>>
{
    public string Name { get; set; }
}