namespace Core.Models;

public interface IModelMetadata
{
    public DateTime CreationDate { get; set; }

    public DateTime ModificationDate { get; set; }
}