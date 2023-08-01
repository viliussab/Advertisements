using API.Pkg.Jwt;
using MediatR;

namespace API.Modules.Auth.Login;

public class LoginCommand : IRequest<JwtPayload>
{
    public string Email { get; set; }
	
    public string Password { get; set; }
}