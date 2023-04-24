using Core.Components;
using MediatR;

namespace Commands.Handlers.Auth;

public class LoginCommand : IRequest<Jwt>
{
    public string Email { get; set; }
	
    public string Password { get; set; }
}