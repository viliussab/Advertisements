using API.Queries.Responses.Prototypes;
using Core.Models;
using Mapster;

namespace API.Queries.MapProfiles;

public class StorageFileMapProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<IStoredFile, FileResponse>().Map(
                x => x.Base64,
                src => Convert.ToBase64String(src.Content));
    }
}