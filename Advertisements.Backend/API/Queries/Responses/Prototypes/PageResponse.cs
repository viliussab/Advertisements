namespace API.Queries.Responses.Prototypes;

public class PageResponse<T>
{
    public int TotalCount { get; set; }
    
    public List<T> Items { get; set; }
    
    public int PageSize { get; set; }
    
    public int PageNumber { get; set; }
    
    public int TotalPages { get; set; }
}