using Microsoft.EntityFrameworkCore;
using Queries.Prototypes;
using Queries.ResponseDto.Prototypes;

namespace Queries.Handlers.Extensions;

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

        int GetPageCount (int pageSize, int totalSize) => ((totalSize - 1) / pageSize) + 1;

        return new PageResponse<T>
        {
            Items = itemsPage,
            PageNumber = pageQuery.PageNumber,
            PageSize = pageQuery.PageSize,
            TotalCount = totalCount,
            TotalPages = GetPageCount(pageQuery.PageNumber, totalCount),
        };
    }
}