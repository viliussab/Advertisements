using Queries.Responses.Prototypes;

namespace Queries.Handlers.Adverts.GetAreas;

public class GetAreaByNameResponse : AreaFields
{
    public List<ObjectResponse> Objects { get; set; }

    public class ObjectResponse : AdvertObjectFields
    {
        public List<AdvertPlaneFields> Planes { get; set; }
        
        public AdvertTypeFields Type { get; set; }
    }
}