using Domain.Errors;
using MediatR;
using OneOf;
using OneOf.Types;

namespace Queries.Prototypes;

public abstract class BasedHandler<TRequest, TResponse, TValidator> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TValidator : BasedValidator<TRequest>
{
    private readonly TValidator _validator;

    protected BasedHandler(TValidator validator)
    {
        _validator = validator;
    }

    public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}