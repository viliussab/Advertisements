namespace Queries.Responses.Prototypes;

public class CustomerFields
{
    public Guid Id { get; set; }
    
    public string Name { get; set; } = null!;

    public string CompanyCode { get; set; } = null!;

    public string VatCode { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string ContactPerson { get; set; } = null!;

    public string Email { get; set; } = null!;
}