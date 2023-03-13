namespace Core.Models;

public interface IStoredFile
{
    public Guid Id { get; set; }
    
    public byte[] Content { get; set; }
    
    public string Name { get; set; }
    
    public string Mime { get; set; }
}