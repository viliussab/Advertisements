namespace API.Pkg.Errors;

public record ValidationError(string PropertyName, string Error);