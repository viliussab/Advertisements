using API.Commands.EnumsRequest;
using API.Commands.Requests;
using API.Commands.Responses;
using API.Pkg.Errors;
using MediatR;
using OneOf;

namespace API.Modules.Billboards.UpdateObject;

public class UpdateObjectCommand : IRequest<OneOf<List<ValidationError>, GuidSuccess>>
{
    public class UpdatePlane
    {
        public Guid? Id { get; set; }
        
        public string PartialName { get; set; } = string.Empty;
        
        public bool IsPermitted { get; set; }
        
        public bool IsPremium { get; set; }
        
        public DateTime? PermissionExpiryDate { get; set; }
        
        public UpdateStatus UpdateStatus { get; set; }

        public List<UpdateFileRequest> Photos { get; set; } = new();
    }
    
    public Guid Id { get; set; }
    
    public string SerialCode { get; set; } = string.Empty;

    public Guid AreaId { get; set; }
    
    public Guid TypeId { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;
    
    public double Longitude { get; set; }
    
    public double Latitude { get; set; }
    
    public bool Illuminated { get; set; }

    public List<UpdatePlane> Planes { get; set; } = new ();
}