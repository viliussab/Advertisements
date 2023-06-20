using Core.Tables.Enums;
using Core.Tables.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Core.Tables.Entities.Users
{
    public class UserTable : IdentityUser, IModelMetadata
    {
        public Role Role { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public DateTime ModificationDate { get; set; }

        public virtual ICollection<UserRefreshTokenTable> RefreshTokens { get; set; } = new List<UserRefreshTokenTable>();
    }
}
