using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class AdvertObject : IModelMetadata
    {
        public string SerialCode { get; set; } = string.Empty;

        public virtual ICollection<AdvertPlane> Planes { get; set; } = new List<AdvertPlane>();
        
        public virtual Guid TypeId { get; set; }

        public virtual AdvertType Type { get; set; } = null!;

        public string Name { get; set; } = string.Empty;
        
        public string Address { get; set; } = string.Empty;

        public string Region { get; set; } = string.Empty;
        
        [Range(-180, 180)]
        public decimal Longitude { get; set; }

        [Range(-90, 90)]
        public decimal Latitude { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public DateTime ModificationDate { get; set; }

        public bool InArea(Area area) => Latitude >= area.LatitudeSouth
                                         && Latitude <= area.LatitudeNorth
                                         && Longitude >= area.LongitudeEast
                                         && Longitude <= area.LongitudeWest;
    }
}
