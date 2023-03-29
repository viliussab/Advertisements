using Core.Models;
using Mapster;
using Queries.Responses.Prototypes;

namespace Queries.MapProfiles;

public class StorageFileMapProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<IStoredFile, FileResponse>().Map(
                x => x.Base64,
                src => Convert.ToBase64String(src.Content));
    }
}