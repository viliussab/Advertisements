using Core.Models;

namespace Queries.Responses.Prototypes;

public class FileResponse
{
    public Guid Id { get; set; }
    
    public string Base64 { get; set; }
    
    public string Name { get; set; }
    
    public string Mime { get; set; }
}