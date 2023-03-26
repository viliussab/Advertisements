using Core.EnumsRequest;

namespace Commands.Requests;

public class UpdateFileRequest : CreateFileRequest
{
    public Guid? Id { get; set; }
    
    public UpdateStatus UpdateStatus { get; set; }
}