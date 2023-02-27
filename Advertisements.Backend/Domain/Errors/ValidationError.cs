namespace Domain.Errors;

public record ValidationError(string PropertyName, string Error);