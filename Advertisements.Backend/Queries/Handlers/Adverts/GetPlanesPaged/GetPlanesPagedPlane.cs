using Core.Models;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedPlane : AdvertPlaneFields
{
    public AdvertObjectResponse Object { get; set; }
    
    public class AdvertObjectResponse : AdvertObjectFields
    {
        public AreaFields Area { get; set; }

        public AdvertTypeFields Type { get; set; }
    }
}

