using Core.Objects.Others;
using MediatR;

namespace Commands.Handlers.Auth.Login;

public class LoginCommand : IRequest<Jwt>
{
    public string Email { get; set; }
	
    public string Password { get; set; }
}