using API.Pkg.Errors;
using MediatR;
using OneOf;

namespace API.Modules.Billboards.GetAreaByName;

public class GetAreaByNameQuery : IRequest<OneOf<NotFoundError, GetAreaByNameResponse>>
{
    public string Name { get; set; }
}