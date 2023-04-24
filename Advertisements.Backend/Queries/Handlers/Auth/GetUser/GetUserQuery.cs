using MediatR;

namespace Queries.Handlers.Auth.GetUser;

public class GetUserQuery : IRequest<UserResponse>
{
    public string Id { get; set; }
}