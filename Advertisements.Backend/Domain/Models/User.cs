using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Domain.Models
{
    public sealed class User : IdentityUser, IModelMetadata
    {
        public Role Role { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public DateTime ModificationDate { get; set; }
    }
}
