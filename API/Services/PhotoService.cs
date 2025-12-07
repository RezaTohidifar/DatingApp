using System;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services;

public class PhotoService : IPhotoService
{
    private readonly CloadinaryApiConf  _conf;
    private readonly Cloudinary _cload;
    public PhotoService(IOptions<CloadinaryApiConf> config)
    {
        _conf = config.Value;
        var acc = new Account(_conf.CloudName,_conf.ClientId,_conf.ClientKey);
        _cload = new Cloudinary(acc);
    }
    public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName,stream),
                Transformation = new Transformation()
                    .Height(500).Width(500).Crop("fill").Gravity("face"),
                    Folder = "da-net8"
            };
            uploadResult = await _cload.UploadAsync(uploadParams);
        }
        return uploadResult;
    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        return await _cload.DestroyAsync(deleteParams);
    }
}
