using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;
using Queries.Responses.Prototypes;

namespace Queries.Extensions;

public static class QueryExtensions
{
    public static async Task<PageResponse<T>> ToPageAsync<T>(
        this IQueryable<T> queryable,
        IPageQuery pageQuery,
        CancellationToken cancellationToken)
    {
        var totalCount = await queryable.CountAsync(cancellationToken);

        var itemsPage = await queryable
            .Skip(pageQuery.Offset)
            .Take(pageQuery.PageSize)
            .ToListAsync(cancellationToken);

        return new PageResponse<T>
        {
            Items = itemsPage,
            PageNumber = pageQuery.PageNumber,
            PageSize = pageQuery.PageSize,
            TotalCount = totalCount,
            TotalPages = GetPageCount(pageQuery.PageSize, totalCount),
        };
    }

    private static int GetPageCount(int pageSize, int totalSize)
    {
        if (totalSize == 0)
        {
            return 1;
        }
        
        return ((totalSize - 1) / pageSize) + 1;
    }
}