using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Core.Models
{
    public class AdvertObject : IModelMetadata
    {
        public Guid Id { get; set; }
        
        public string SerialCode { get; set; } = string.Empty;

        public virtual ICollection<AdvertPlane> Planes { get; set; } = new List<AdvertPlane>();
        
        public Guid AreaId { get; set; }

        public virtual Area Area { get; set; } = null!;
        
        public Guid TypeId { get; set; }

        public virtual AdvertType Type { get; set; } = null!;

        public string Name { get; set; } = string.Empty;
        
        public string Address { get; set; } = string.Empty;

        public string Region { get; set; } = string.Empty;
        
        public bool Illuminated { get; set; }
        
        [Range(-180, 180)]
        [Precision(7)]
        public double Longitude { get; set; }

        [Range(-90, 90)]
        [Precision(7)]
        public double Latitude { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public DateTime ModificationDate { get; set; }

        public bool InArea(Area area) => Latitude >= area.LatitudeSouth
                                         && Latitude <= area.LatitudeNorth
                                         && Longitude >= area.LongitudeEast
                                         && Longitude <= area.LongitudeWest;
    }
}
