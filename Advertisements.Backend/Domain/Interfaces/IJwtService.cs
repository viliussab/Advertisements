using Domain.Components;
using Domain.Models;

namespace Domain.Interfaces;

public interface IJwtService
{
    UserRefreshToken BuildRefreshToken(User user);
	
    Jwt BuildJwt(UserRefreshToken refreshToken);

    bool IsAccessTokenValid(string accessToken);
}