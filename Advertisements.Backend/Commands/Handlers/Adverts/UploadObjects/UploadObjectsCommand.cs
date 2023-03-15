using MediatR;

namespace Commands.Handlers.Adverts.UploadObejcts;

public class UploadObjectsCommand : IRequest<Unit>
{
    public Stream File { get; set; }
}