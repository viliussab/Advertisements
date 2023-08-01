using API.Pkg.Errors;
using MediatR;
using OneOf;

namespace API.Modules.Billboards.GetObjectById;

public class GetObjectByIdQuery : IRequest<OneOf<GetObjectByIdObject, NotFoundError>>
{
    public Guid Id { get; set; }
}