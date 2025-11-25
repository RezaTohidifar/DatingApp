using System;
using System.Linq;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository repo) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await repo.GetMembersAsync();
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

        return Ok(user);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUserName(string username)
    {
        var user = await repo.GetMemberAsync(username);
        return Ok(user);
    }
}
