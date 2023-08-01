using MediatR;

namespace API.Modules.Billboards.UploadObjects;

public class UploadObjectsCommand : IRequest<Unit>
{
    public Stream File { get; set; }
}