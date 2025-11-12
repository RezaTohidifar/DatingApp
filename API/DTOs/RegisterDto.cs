using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(10)]
    public string UserName { get; set; }
    [Required]
    [MaxLength(20)]
    public string Password { get; set; }

}

public class LoginDto
{
    [Required]
    [MaxLength(10)]
    public string UserName { get; set; }
    [Required]
    [MaxLength(20)]
    public string Password { get; set; }

}


public class RegisterOutputDto
{
    public int Id { get; set; }
    public string? UserName { get; set; }
}