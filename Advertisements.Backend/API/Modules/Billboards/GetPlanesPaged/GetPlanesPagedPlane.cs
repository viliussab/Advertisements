using API.Queries.Responses.Prototypes;

namespace API.Modules.Billboards.GetPlanesPaged;

public class GetPlanesPagedPlane : AdvertPlaneFields
{
    public AdvertObjectResponse Object { get; set; }
    
    public class AdvertObjectResponse : AdvertObjectFields
    {
        public AreaFields Area { get; set; }

        public AdvertTypeFields Type { get; set; }
    }
}

