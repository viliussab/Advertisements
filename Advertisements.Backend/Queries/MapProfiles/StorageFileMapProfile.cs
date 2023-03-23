using Core.Models;
using Mapster;
using Queries.Responses.Prototypes;

namespace Queries.MapProfile;

public class StorageFileMapProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<IStoredFile, FileResponse>().Map(
                x => x.Base64Content,
                src => Convert.ToBase64String(src.Content));
    }
}