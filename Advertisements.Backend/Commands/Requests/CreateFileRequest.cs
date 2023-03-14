namespace Commands.Requests;

public class CreateFileRequest
{
    public string Mime { get; set; } = null!;

    public string Base64 { get; set; } = null!;

    public string Name { get; set; } = null!;
}