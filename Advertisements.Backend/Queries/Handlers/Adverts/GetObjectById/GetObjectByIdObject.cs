using Core.Objects.Models.Plane;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetObjectById;

public class GetObjectByIdObject : Location
{
    public List<PlaneResponse> Planes { get; set; }
    
    public class PlaneResponse : Plane
    {
        public List<FileResponse> Photos { get; set; }
    }
}

