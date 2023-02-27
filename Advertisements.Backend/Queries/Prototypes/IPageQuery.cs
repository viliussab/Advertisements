namespace Queries.Prototypes;

public interface IPageQuery
{
    public int PageNumber { get; set; }
    
    public int PageSize { get; set; }

    public int Offset => PageNumber * PageSize;
}