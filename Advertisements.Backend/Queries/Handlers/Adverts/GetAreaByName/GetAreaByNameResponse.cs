using Core.Objects.Models.Plane;
using Queries.Responses.Prototypes;
using Area = Core.Objects.Models.Areas.Area;
using Location = Core.Objects.Models.Plane.Location;

namespace Queries.Handlers.Adverts.GetAreaByName;

public class GetAreaByNameResponse : Core.Objects.Models.Areas.Area
{
    public List<ObjectResponse> Objects { get; set; }

    public class ObjectResponse : Core.Objects.Models.Plane.Location
    {
        public List<Plane> Planes { get; set; }
        
        public PlaneType Type { get; set; }
    }
}