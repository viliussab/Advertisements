using API.Queries.Responses.Prototypes;

namespace API.Modules.Billboards.GetObjectById;

public class GetObjectByIdObject : AdvertObjectFields
{
    public List<PlaneResponse> Planes { get; set; }
    
    public class PlaneResponse : AdvertPlaneFields
    {
        public List<FileResponse> Photos { get; set; }
    }
}

