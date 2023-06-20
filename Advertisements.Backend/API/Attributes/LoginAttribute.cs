using Core.Tables.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace API.Attributes;

public class LoginAttribute : AuthorizeAttribute
{
    public LoginAttribute(params Role[] requiredPermissions)
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