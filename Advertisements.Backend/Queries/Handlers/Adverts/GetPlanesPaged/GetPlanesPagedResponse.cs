using Core.Models;
using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetPlanesPaged;

public class GetPlanesPagedResponse : AdvertPlaneFields
{
    public AdvertObjectWithAreaAndType Object { get; set; }
}

public class AdvertObjectWithAreaAndType : AdvertObjectFields
{
    public AreaFields Area { get; set; }

    public AdvertTypeFields Type { get; set; }
}