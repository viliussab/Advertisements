using Core.EnumsRequest;

namespace Commands.Requests;

public class UpdateFileRequest : CreateFileRequest
{
    public UpdateStatus UpdateStatus { get; set; }
}