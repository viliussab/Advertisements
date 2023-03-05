namespace Core.Errors;

public record ValidationError(string PropertyName, string Error);