using System;
using System.Security.Claims;

namespace API.Extentions;

public static class ClaimPrinciole
{
    public static string GetUsernameFromToken(this ClaimsPrincipal user)
    {
        var username = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (username == null) throw new Exception("failed to fetch user from token");
        return username;
    }
}
