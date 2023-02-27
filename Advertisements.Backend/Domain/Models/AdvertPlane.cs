using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class AdvertPlane : IModelMetadata
    {
        public Guid Id { get; set; }

        public virtual Guid ObjectId { get; set; }

        public virtual AdvertObject Object { get; set; } = null!;

        public virtual ICollection<CampaignPlane> PlaneCampaigns { get; set; } = null!;

        public string PartialName { get; set; } = string.Empty;

        public bool Illuminated { get; set; }
        
        public DateOnly ExpirationDate { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public DateTime ModificationDate { get; set; }
    }
}
