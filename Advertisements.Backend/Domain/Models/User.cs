using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Domain.Models
{
    public class User : IdentityUser, IModelMetadata
    {
        public Role Role { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public DateTime ModificationDate { get; set; }

        public virtual ICollection<UserRefreshToken> RefreshTokens { get; set; } = new List<UserRefreshToken>();
    }
}
