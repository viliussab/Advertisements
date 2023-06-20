using Core.Objects.Models.Plane;
using Queries.Responses.Prototypes;
using Area = Core.Objects.Models.Areas.Area;
using Location = Core.Objects.Models.Plane.Location;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedPlane : Plane
{
    public AdvertObjectResponse Object { get; set; }
    
    public class AdvertObjectResponse : Core.Objects.Models.Plane.Location
    {
        public Area Area { get; set; }

        public PlaneType Type { get; set; }
    }
}

