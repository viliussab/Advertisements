using System.Reflection;

namespace API.Pkg.Errors;

public class NotFoundError
{
    public NotFoundError(object identifier, MemberInfo model)
    {
        Identifier = identifier.ToString();
        var name = model.Name;
        Model = char.ToLower(name[0]) + name[1..];
    }

    public string? Identifier { get; set; }
    
    public string Model { get; set; }

    public string Message => $"{Model} not found with identifier: ${Identifier}";
}