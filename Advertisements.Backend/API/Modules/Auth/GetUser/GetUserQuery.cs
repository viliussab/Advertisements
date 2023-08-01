using MediatR;

namespace API.Modules.Auth.GetUser;

public class GetUserQuery : IRequest<UserResponse>
{
    public string Id { get; set; }
}