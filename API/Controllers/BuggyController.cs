using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    private readonly DataContext _data;
    public BuggyController(DataContext data)
    {
        _data = data;
    }

    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "secret tex";
    }
    
    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotAuth()
    {
        var thing = _data.Users.Find(-1);
        if  (thing == null) return NotFound();
        return thing;
    }

    [HttpGet("server-error")]
    public ActionResult<AppUser> GetServerError()
    {
        var thing = _data.Users.Find(-1) ?? throw new Exception();
        return thing;
    }

    [HttpGet("bad-request")]
    public ActionResult<AppUser> GetBadRequest()
    {
        
        return BadRequest("bad data");
    }

}
