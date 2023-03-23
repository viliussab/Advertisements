using Core.EnumsRequest;

namespace Commands.Requests;

public class UpdateFileRequest : CreateFileRequest
{
    public Guid? Id { get; set; }
    
    public FileUpdateStatus UpdateStatus { get; set; }
}