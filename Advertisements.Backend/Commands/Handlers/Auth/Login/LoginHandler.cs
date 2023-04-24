using Core.Components;
using Core.Database;
using Core.Interfaces;
using Core.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Commands.Handlers.Auth.Login;

public class LoginHandler : IRequestHandler<LoginCommand, Jwt>
{
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly IJwtService _jwtService;
    private readonly AdvertContext _context;

    public LoginHandler(
        SignInManager<User> signInManager,
        UserManager<User> userManager,
        IJwtService jwtService,
        AdvertContext context)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _jwtService = jwtService;
        _context = context;
    }

    public async Task<Jwt> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
        {
            throw new Exception("No such email found");
        }

        var signResult = await _signInManager.PasswordSignInAsync(
            user,
            request.Password,
            isPersistent: false,
            lockoutOnFailure: false);

        if (!signResult.Succeeded)
        {
            throw new Exception("Incorrect email password combination");
        }

        var refreshToken = _jwtService.BuildRefreshToken(user);

        await _context.AddAsync(refreshToken, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        
        var jwtDto = _jwtService.BuildJwt(refreshToken);
        return jwtDto;
    }
}