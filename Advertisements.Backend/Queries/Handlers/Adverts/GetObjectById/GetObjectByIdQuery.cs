using Core.Errors;
using MediatR;
using OneOf;

namespace Queries.Handlers.Adverts.GetObjectById;

public class GetObjectByIdQuery : IRequest<OneOf<GetObjectByIdObject, NotFoundError>>
{
    public Guid Id { get; set; }
}