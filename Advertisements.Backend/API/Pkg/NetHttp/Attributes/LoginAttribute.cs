using Core.Database.Tables;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace API.Pkg.NetHttp.Attributes;

public class LoginAttribute : AuthorizeAttribute
{
    public LoginAttribute(params UserRole[] requiredPermissions)
    {
        var permissionsAsStrings = requiredPermissions.Select(x => x.ToString());
        Roles = string.Join(",", permissionsAsStrings);
        AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme;
    }

    public LoginAttribute()
    {
        AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme;
    }
}