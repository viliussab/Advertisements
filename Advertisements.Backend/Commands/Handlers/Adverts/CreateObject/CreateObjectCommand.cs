using Commands.ResponseDto;
using Domain.Errors;
using MediatR;
using OneOf;

namespace Commands.Handlers.Adverts.CreateObject;

public class CreateObjectCommand : IRequest<OneOf<List<ValidationError>, List<NotFoundError>, CreateGuidSuccess>>
{
    public class CreatePlane
    {
        public string PartialName { get; set; } = string.Empty;
        
        public bool Permitted { get; set; }
        
        public DateOnly? PermittedExpiryDate { get; set; }
    }
    
    public string SerialCode { get; set; } = string.Empty;

    public Guid AreaId { get; set; }
    
    public Guid TypeId { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;
    
    public decimal Longitude { get; set; }
    
    public decimal Latitude { get; set; }
    
    public bool Illuminated { get; set; }

    public List<CreatePlane> PlanesToCreate { get; set; } = new ();
}