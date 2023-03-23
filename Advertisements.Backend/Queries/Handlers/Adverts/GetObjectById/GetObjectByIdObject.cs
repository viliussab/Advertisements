using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetObjectById;

public class GetObjectByIdObject : AdvertObjectFields
{
    public List<PlaneWithPhotos> Planes { get; set; }
}

public class PlaneWithPhotos : AdvertPlaneFields
{
    public List<FileResponse> Photos { get; set; }
}