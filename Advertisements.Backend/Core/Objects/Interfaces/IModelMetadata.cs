namespace Core.Tables.Interfaces;

public interface IModelMetadata
{
    public DateTime CreationDate { get; set; }

    public DateTime ModificationDate { get; set; }
}