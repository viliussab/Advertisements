using Core.Models;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetObjectByIdObject : AdvertObjectFields
{
    public List<PlaneWithPhotos> Planes { get; set; }
}

public class PlaneWithPhotos : AdvertPlaneFields
{
    public List<FileFields> Photos { get; set; }
}