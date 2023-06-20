using System.ComponentModel.DataAnnotations;
using Core.Tables.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Core.Tables.Entities.Planes
{
    public class LocationTable : IModelMetadata
    {
        public Guid Id { get; set; }
        
        public string SerialCode { get; set; } = string.Empty;

        public virtual ICollection<PlaneTable> Planes { get; set; } = new List<PlaneTable>();
        
        public Guid AreaId { get; set; }

        public virtual Area.Area Area { get; set; } = null!;
        
        public Guid TypeId { get; set; }

        public virtual PlaneTypeTable TypeTable { get; set; } = null!;

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

        public bool InArea(Area.Area area) => Latitude >= area.LatitudeSouth
                                              && Latitude <= area.LatitudeNorth
                                              && Longitude >= area.LongitudeEast
                                              && Longitude <= area.LongitudeWest;
    }
}
