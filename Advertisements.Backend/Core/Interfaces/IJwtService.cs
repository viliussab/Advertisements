using Core.Components;
using Core.Models;

namespace Core.Interfaces;

public interface IJwtService
{
    UserRefreshToken BuildRefreshToken(User user);

    Jwt BuildJwt(UserRefreshToken refreshToken);

    Task<Jwt> SyncAccessTokenAsync(Jwt jwtDto);
}