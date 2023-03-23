using Commands.Requests;
using Commands.Responses;
using Core.Errors;
using MediatR;
using OneOf;

namespace Commands.Handlers.Adverts.CreateObject;

public class CreateObjectCommand : IRequest<OneOf<List<ValidationError>, GuidSuccess>>
{
    public class CreatePlane
    {
        public string PartialName { get; set; } = string.Empty;
        
        public bool IsPermitted { get; set; }
        
        public DateTime? PermissionExpiryDate { get; set; }

        public bool IsPremium { get; set; }

        public List<CreateFileRequest> Photos { get; set; } = new();
    }
    
    public string SerialCode { get; set; } = string.Empty;

    public Guid AreaId { get; set; }
    
    public Guid TypeId { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;
    
    public double Longitude { get; set; }
    
    public double Latitude { get; set; }
    
    public bool Illuminated { get; set; }

    public List<CreatePlane> Planes { get; set; } = new ();
}