using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetObjectById;

public class GetObjectByIdObject : AdvertObjectFields
{
    public List<PlaneResponse> Planes { get; set; }
    
    public class PlaneResponse : AdvertPlaneFields
    {
        public List<FileResponse> Photos { get; set; }
    }
}

