using Core.Tables.Entities.Campaigns;
using Queries.Functions;

namespace Tests.Functions;

[TestFixture]
public class CampaignFunctionsTests
{
    [Test]
    public async Task BuildPriceDetails_ShouldReturnCorrectCalculatedPrices()
    {
        // Arrange
        var campaign = BuildCampaign();

        var expectedPrices = new
        {
            TotalNoVat = 400f,
            TotalVatPortion = 84f,
            TotalIncludingVat = 484f,
        };

        // Act
        var calculations = CampaignFunctions.BuildPriceDetailsCampaign(campaign);
        var calculatedPrices = new
        {
            TotalNoVat = calculations.TotalNoVat,
            TotalVatPortion = calculations.TotalVatPortion,
            TotalIncludingVat = calculations.TotalIncludingVat,
        };

        // Assert
        expectedPrices.Should().BeEquivalentTo(calculatedPrices);
    }
    
    [Test]
    public async Task BuildPriceDetails_ShouldIncludeCorrectPressPrice_WhenCustomerRequiresPrinting()
    {
        // Arrange
        var campaign = BuildCampaign();
        campaign.RequiresPrinting = true;

        // Act
        var calculations = CampaignFunctions.BuildPriceDetailsCampaign(campaign);


        // Assert
        calculations.Press.TotalPrice.Should().Be(16f);
    }
    
    [Test]
    public async Task BuildPriceDetails_ShouldReturnCorrectCalculatedPrices_WhenCustomerRequiresPrinting()
    {
        // Arrange
        var campaign = BuildCampaign();
        campaign.RequiresPrinting = true;
        
        var expectedPrices = new
        {
            TotalNoVat = 416f,
            TotalVatPortion = 87.36,
            TotalIncludingVat = 416f + 87.36,
        };
        
        // Act
        var calculations = CampaignFunctions.BuildPriceDetailsCampaign(campaign);
        var calculatedPrices = new
        {
            TotalNoVat = calculations.TotalNoVat,
            TotalVatPortion = calculations.TotalVatPortion,
            TotalIncludingVat = calculations.TotalIncludingVat,
        };
        
        // Assert
        expectedPrices.Should().BeEquivalentTo(calculatedPrices);
    }
    
    [Test]
    public async Task BuildPriceDetails_ShouldReturnCorrectUnplannedPrice_WhenCustomerRequestsIrregularCampaignPeriod()
    {
        // Arrange
        var campaign = BuildCampaign();
        campaign.Start = new DateTime(2023, 01, 02);
        campaign.End = new DateTime(2023, 01, 09);

        // Act
        var calculations = CampaignFunctions.BuildPriceDetailsCampaign(campaign);


        // Assert
        calculations.Unplanned.TotalPrice.Should().Be(24f);
    }
    
    [Test]
    public async Task BuildPriceDetails_ShouldReturnCorrectCalculatedPrices_WhenCustomerRequestsIrregularCampaignPeriod()
    {
        // Arrange
        var campaign = BuildCampaign();
        campaign.Start = new DateTime(2023, 01, 02);
        campaign.End = new DateTime(2023, 01, 09);
        
        var expectedPrices = new
        {
            TotalNoVat = 424f,
            TotalVatPortion = 89.04,
            TotalIncludingVat = 424f + 89.04,
        };
        
        // Act
        var calculations = CampaignFunctions.BuildPriceDetailsCampaign(campaign);
        var calculatedPrices = new
        {
            TotalNoVat = calculations.TotalNoVat,
            TotalVatPortion = Math.Round(calculations.TotalVatPortion, 2),
            TotalIncludingVat = Math.Round(calculations.TotalIncludingVat, 2),
        };
        
        // Assert
        expectedPrices.Should().BeEquivalentTo(calculatedPrices);
    }

    public CampaignTable BuildCampaign()
    {
        return new CampaignTable
        {
            Id = default,
            CustomerId = default,
            Start = new DateTime(2023, 01, 03),
            End = new DateTime(2023, 01, 10),
            PricePerPlane = 100,
            PlaneAmount = 2,
            RequiresPrinting = false,
            IsFulfilled = false,
            DiscountPercent = 0,
            CreationDate = default,
            ModificationDate = default,
        };
    }
}