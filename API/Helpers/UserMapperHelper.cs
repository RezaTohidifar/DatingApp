using System;
using API.DTOs;
using API.Entities;
using API.Extentions;
using AutoMapper;

namespace API.Helpers;

public class UserMapperHelper : Profile
{
    public UserMapperHelper()
    {
        CreateMap<AppUser, MemberDto>()
        .ForMember(s => s.Age, o => o.MapFrom(x => x.DateOfBirth.CalculateAge()))
         .ForMember(d => d.PhotoUrl, oa => oa.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        CreateMap<Photo, PhotoDto>();
    }

}
