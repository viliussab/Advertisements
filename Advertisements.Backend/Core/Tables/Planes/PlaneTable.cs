using Core.Tables.Entities.Campaigns;
using Core.Tables.Interfaces;

namespace Core.Tables.Entities.Planes
{
    public class PlaneTable : IModelMetadata
    {
        public Guid Id { get; set; }

        public Guid ObjectId { get; set; }

        public virtual LocationTable Object { get; set; } = null!;

        public virtual ICollection<CampaignPlaneTable> PlaneCampaigns { get; set; } = null!;

        public string PartialName { get; set; } = string.Empty;

        public bool IsPermitted { get; set; }
        
        public DateTime? PermissionExpiryDate { get; set; }
        
        public bool IsPremium { get; set; }

        public virtual ICollection<PlanePhoto> Photos { get; set; } = null!;
        
        public DateTime CreationDate { get; set; }
        
        public DateTime ModificationDate { get; set; }
    }
}
