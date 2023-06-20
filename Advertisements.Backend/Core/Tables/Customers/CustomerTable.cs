using Core.Tables.Entities.Campaigns;

namespace Core.Tables.Entities.Customers;

public class CustomerTable
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string CompanyCode { get; set; } = null!;

    public string VatCode { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string ContactPerson { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<CampaignTable> Campaigns { get; set; } = new List<CampaignTable>();
}