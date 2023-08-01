using MediatR;

namespace API.Queries.Prototypes;

public abstract class BasedHandler<TRequest, TResponse, TValidator> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TValidator : BasedValidator<TRequest>
{
    protected readonly TValidator Validator;

    protected BasedHandler(TValidator validator)
    {
        Validator = validator;
    }

    public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}