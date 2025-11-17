using System;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext data,ITokenService token) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto mdata)
    {
        if (await UserExists(mdata.UserName)) { return BadRequest("User already exists"); };
        using var hmac = new HMACSHA512();
        var user = new AppUser()
        {
            UserName = mdata.UserName.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(mdata.Password)),
            PasswordSalt = hmac.Key
        };

        data.Users.Add(user);
        await data.SaveChangesAsync();
        return new UserDto() {UserName = user.UserName , Token = token.CreateToken(user)};
    }

    private async Task<bool> UserExists(string username)
    {
        return await data.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> LoginIn(LoginDto mdata)
    {
        ///check if user name exists
        var user = await data.Users.FirstOrDefaultAsync(x => x.UserName == mdata.UserName.ToLower());
        if (user == null) return Unauthorized("invalid User");
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(mdata.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        }
        var accessToken = token.CreateToken(user);
        return Ok(new UserDto()
        {
            UserName = user.UserName,
            Token = token.CreateToken(user)
        });
    }
}
