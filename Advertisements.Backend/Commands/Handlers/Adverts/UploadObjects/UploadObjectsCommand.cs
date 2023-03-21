using MediatR;

namespace Commands.Handlers.Adverts.UploadObjects;

public class UploadObjectsCommand : IRequest<Unit>
{
    public Stream File { get; set; }
}