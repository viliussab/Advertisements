using Core.Errors;
using Core.Successes;
using FluentValidation;
using MediatR;
using OneOf;
using OneOf.Types;

namespace Queries.Prototypes;

public class BasedValidator<TRequest> : AbstractValidator<TRequest>
{
    public async Task<List<ValidationError>> ValidatorRequestAsync(TRequest request)
    {
        var validationResult = await ValidateAsync(request);

        if (validationResult.IsValid)
        {
            return new List<ValidationError>();
        }

        var errors = validationResult.Errors.Select(validationFailure => new ValidationError(
            validationFailure.PropertyName,
            validationFailure.ErrorMessage));

        return errors.ToList();
    }
}