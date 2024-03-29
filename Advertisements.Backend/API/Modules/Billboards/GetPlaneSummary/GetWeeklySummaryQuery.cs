using API.Queries.Prototypes;
using MediatR;

namespace API.Modules.Billboards.GetPlaneSummary;

public class GetWeeklySummaryQuery : IRequest<PlaneSummary>, IPageQuery
{
    public DateTime From { get; set; }

    public DateTime To => From.AddYears(1);
    
    public int PageNumber { get; set; }
    
    public int PageSize { get; set; }
    
    public string? Name { get; set; }
    
    public string? Address { get; set; }
    
    public string? Side { get; set; }
    
    public string? Region { get; set; }
    
    public bool? Premium { get; set; }
}