using Core.Objects.Others;
using Core.Tables.Entities.Users;

namespace Core.Vendor;

public interface IJwtService
{
    UserRefreshTokenTable BuildRefreshToken(UserTable userTable);

    Jwt BuildJwt(UserRefreshTokenTable refreshTokenTable);

    Task<Jwt> SyncAccessTokenAsync(Jwt jwtDto);
}