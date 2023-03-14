using Queries.ResponseDto.Prototypes;

namespace Queries.Handlers.Adverts.GetAreas;

public class GetPlanesPagedResponse : AdvertPlaneFields
{
    public AdvertObjectFields Object { get; set; }
}