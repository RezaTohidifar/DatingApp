using System;
using System.Linq;
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extentions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository repo,IMapper mapper, IPhotoService photoService) : BaseApiController
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


    [HttpPut]
    public async Task<ActionResult> UpdateData(MemberUpdateDto userData)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(username)) return BadRequest("Username is not valid");
        var data = await repo.GetUserByUsernameAsync(username);
        if (data == null) return BadRequest("Username is not valid");
        mapper.Map(userData,data);
        if (await repo.SaveChangesAsync()) return Ok();
        return BadRequest("Save Failed");
    }

    [HttpPost("addPhoto")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile form)
    {
        AppUser username = await repo.GetUserByUsernameAsync(User.GetUsernameFromToken());
        if(username == null) return BadRequest("invalid Username");
        var result = await photoService.AddPhotoAsync(form);
        if (result.Error != null) return BadRequest(result.Error.Message);
        var photo = new Photo()
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        username.Photos.Add(photo);
        if (await repo.SaveChangesAsync()) return mapper.Map<PhotoDto>(photo);
        return BadRequest("unable to save photo");

    }
}
