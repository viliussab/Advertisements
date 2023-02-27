using Domain.Errors;
using FluentValidation;
using MediatR;
using OneOf;
using OneOf.Types;

namespace Queries.Prototypes;

public class BasedValidator<TRequest> : AbstractValidator<TRequest>
{
    public async Task<OneOf<Success, IEnumerable<ValidationError>>> ValidateRequestAsync(TRequest request)
    {
        var validationResult = await this.ValidateAsync(request);

        if (validationResult.IsValid)
        {
            return new Success();
        }

        var errors = validationResult.Errors.Select(validationFailure => new ValidationError(
            validationFailure.PropertyName,
            validationFailure.ErrorMessage));

        return errors.ToList();
    }
}