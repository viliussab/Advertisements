namespace Domain.Errors;

public class NotFoundError
{
    public NotFoundError(Guid id, Type model)
    {
        Id = id;
        var name = model.Name;
        Model = char.ToLower(name[0]) + name[1..];
    }

    public Guid Id { get; set; }
    
    public string Model { get; set; }

    public string Message => $"{Model} not found with id: ${Id}";
}