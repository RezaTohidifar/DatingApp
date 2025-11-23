using System;
using System.Linq;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[Authorize]
public class UsersController(IUserRepository repo) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await repo.GetUsersAsync();
        return Ok(users);
    }

    [HttpGet("GetUsersByName")]
    public async Task<ActionResult<AppUser>> GetUsersByName([FromQuery] string username)
    {
        var user = await repo.GetUserByUsernameAsync(username);
        return Ok(user);
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUsersById(int id)
    {
        var user = await repo.GetUserById(id);

        return Ok (user);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<AppUser>> GetUserName(string username)
    {
        var user = await repo.GetUserByUsernameAsync(username);

        return  Ok(user);
    }


}
