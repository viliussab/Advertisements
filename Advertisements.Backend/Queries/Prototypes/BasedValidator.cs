using Core.Errors;
using Core.Successes;
using FluentValidation;
using MediatR;
using OneOf;
using OneOf.Types;

namespace Queries.Prototypes;

public class BasedValidator<TRequest> : AbstractValidator<TRequest>
{
    public async Task<OneOf<List<ValidationError>, ValidationSuccess>> ValidatorRequestAsync(TRequest request)
    {
        var validationResult = await ValidateAsync(request);

        if (validationResult.IsValid)
        {
            return new ValidationSuccess();
        }

        var errors = validationResult.Errors.Select(validationFailure => new ValidationError(
            validationFailure.PropertyName,
            validationFailure.ErrorMessage));

        return errors.ToList();
    }
}