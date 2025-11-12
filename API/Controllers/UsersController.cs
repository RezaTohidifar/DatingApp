using System;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(DataContext dbcon) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await dbcon.Users.ToListAsync();
        if (users.Count == 0) return NoContent();
        return Ok(users);
    }

    [HttpGet("GetUsersByName")]
    public async Task<ActionResult<AppUser>> GetUsersByName([FromQuery] string username)
    {
        var user = await dbcon.Users.SingleOrDefaultAsync(x => x.UserName == username);
        if (user == null)
        {
            return NoContent();
        }
        return Ok(user);
    }
    
    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUsersById(int id)
    {
        var user =await dbcon.Users.FindAsync(id);
        if ( user == null) { return NoContent(); }
        return Ok (user);
    }

}
