using Core.Tables.Entities.Users;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Queries.Handlers.Auth.GetUser;

public class GetUserHandler : IRequestHandler<GetUserQuery, UserResponse>
{
    private readonly UserManager<UserTable> _userManager;

    public GetUserHandler(UserManager<UserTable> userManager)
    {
        _userManager = userManager;
    }

    public async Task<UserResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id);
        if (user is null)
        {
            throw new Exception(request.Id);
        }
		
        var dto = user.Adapt<UserResponse>();

        return dto;
    }
}