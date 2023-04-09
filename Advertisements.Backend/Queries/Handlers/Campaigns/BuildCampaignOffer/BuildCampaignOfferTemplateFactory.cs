using Core.Models;
using Queries.Extensions;
using Queries.Functions;

namespace Queries.Handlers.Campaigns.BuildCampaignOffer;

public class BuildCampaignOfferTemplateFactory
{
    public string InjectCustomerRepresentative(string html, Customer customer, string campaignTitle)
    {
        var tableRows = new[]
        {
            BuildRepresentativeRow("Klientas", customer.Name),
            BuildRepresentativeRow("Įm. kodas", customer.CompanyCode),
            BuildRepresentativeRow("PVM kodas", customer.VatCode),
            BuildRepresentativeRow("Adresas", customer.Address),
            BuildRepresentativeRow("Kampanija", campaignTitle),
            BuildRepresentativeRow("Kontaktinis asmuo", customer.ContactPerson),
            BuildRepresentativeRow("Telefonas", customer.Phone),
            BuildRepresentativeRow("El. paštas", customer.Email),
        };

        var template = BuildRepresentativeTable(tableRows);
        var updatedHtml = html.Replace("{{CustomerRepresentativeTable}}", template);
        
        return updatedHtml;
    }
    
    public string InjectDemoCompanyRepresentative(string html)
    {
        const string template = """<table class="table">"""
                                + """<tbody>"""
                                + """             
                                    <tr>
                                        <td>
                                            Pasiūlymą parengė
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Vardenis Pavardenis, pardavimų atstovas
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            +37052396060
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            varpav@reklamosarka.lt
                                        </td>
                                    </tr>
                                """
                                + """</tbody>"""
                                + """</table>""";;
        var updatedHtml = html.Replace("{{CompanyRepresentativeTable}}", template);
        
        return updatedHtml;
    }

    public string InjectTotalSums(string html, CampaignWithPriceDetails campaign)
    {
        return html
            .Replace("{{TotalNoVat}}", campaign.TotalNoVat.ToMonetaryString())
            .Replace("{{TotalOnlyVat}}", campaign.TotalVatPortion.ToMonetaryString())
            .Replace("{{TotalInclVat}}", campaign.TotalIncludingVat.ToMonetaryString());
    }
    
    public string InjectPlaneTooltip(string html, CampaignWithPriceDetails campaign)
    {
        var tooltipHtml = campaign.Press is null
            ? ""
            : """<sup style="margin-left: 0.5rem">2</sup> Užsakomų plakatų skaičius 10% didesnis nei nuomojamų plokštumų""";

        return html.Replace("{{PlaneCalculationTooltip}}", tooltipHtml);
    }

    public string InjectTableRows(string html, CampaignWithPriceDetails campaign)
    {
        const string rowTemplate = """              
            <tr>
                <td class="cell">
                    {{Product}}
                </td>
                <td class="cell">
                    {{Amount}}
                </td>
                <td class="cell">
                    {{WeekCount}}
                </td>
                <td class="cell">
                    {{Price}}€
                </td>
                <td class="cell">
                    {{TotalPrice}}€
                </td>
                <td class="cell">
                    {{DiscountPercent}}
                </td>
                <td class="cell">
                    {{PriceDiscounted}}€
                </td>
                <td class="cell">
                    {{TotalPriceDiscounted}}€
                </td>
            </tr>
        """;

        var planeRow = rowTemplate
            .Replace("{{Product}}", "Plokštuma")
            .Replace("{{Amount}}", campaign.PlaneAmount.ToString())
            .Replace("{{WeekCount}}", campaign.WeekCount.ToString())
            .Replace("{{Price}}", campaign.PricePerPlane.ToMonetaryString())
            .Replace("{{TotalPrice}}", campaign.PlanesTotalPrice.ToMonetaryString())
            .Replace("{{DiscountPercent}}", campaign.DiscountPercent + "%")
            .Replace("{{PriceDiscounted}}", campaign.PlaneUnitPriceDiscounted.ToMonetaryString())
            .Replace("{{TotalPriceDiscounted}}", campaign.PlanesTotalPriceDiscounted.ToMonetaryString());

        var press = campaign.Press;
        
        var pressRow = press is null 
            ? ""
            : rowTemplate
                .Replace("{{Product}}", "Spauda")
                .Replace("{{Amount}}", press.UnitCount + "<sup>2</sup>")
                .Replace("{{WeekCount}}", "-")
                .Replace("{{Price}}", press.UnitPrice.ToMonetaryString())
                .Replace("{{TotalPrice}}", press.TotalPrice.ToMonetaryString())
                .Replace("{{DiscountPercent}}", "-")
                .Replace("{{PriceDiscounted}}", press.UnitPrice.ToMonetaryString())
                .Replace("{{TotalPriceDiscounted}}", press.TotalPrice.ToMonetaryString());

        var unplanned = campaign.Unplanned;
        
        var unplannedRow = unplanned is null
            ? ""
            : rowTemplate
                .Replace("{{Product}}", "Neplaninis kabinimas")
                .Replace("{{Amount}}", campaign.PlaneAmount.ToString())
                .Replace("{{WeekCount}}", "-")
                .Replace("{{Price}}", unplanned.UnitPrice.ToMonetaryString())
                .Replace("{{TotalPrice}}", unplanned.TotalPrice.ToMonetaryString())
                .Replace("{{DiscountPercent}}", "-")
                .Replace("{{PriceDiscounted}}", unplanned.UnitPrice.ToMonetaryString())
                .Replace("{{TotalPriceDiscounted}}", unplanned.TotalPrice.ToMonetaryString());

        var rowsHtml = planeRow + pressRow + unplannedRow;
        var updatedHtml = html.Replace("<tr><td>{{OrderedItems}}</td></tr>", rowsHtml);
        
        return updatedHtml;
    }
    
    private string BuildRepresentativeTable(string[] tableRows)
    {
        var template = """<table class="table">"""
                       + """<tbody>"""
                       + string.Join("", tableRows)
                       + """</tbody>"""
                       + """</table>""";

        return template;
    }

    private string BuildRepresentativeRow(string header, string content)
    {
        const string customerRowTemplate =
            """
              <tr>
                <td class="customer-header cell">
                  {{Header}}
                </td>
                <td class="customer-content cell">
                  {{Content}}
                </td>
              </tr>
            """;

        var template = customerRowTemplate
            .Replace("{{Header}}", header)
            .Replace("{{Content}}", content);

        return template;
    }

    public string InitialTemplate =>
        """
<!DOCTYPE html>
<html lang="lt">
    <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Offer</title>
        <style>
            html {
                line-height: 1.15;
                -webkit-text-size-adjust: 100%;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            }
            .page {
                margin: 3rem;
            }
            .upper {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .logo {
                width: 24rem;
            }
            .table {
                border-collapse: collapse;
            }
            .order-title {
                margin-bottom: 0.5rem;
                margin-top: 1.5rem;
                font-size: 1.25rem;
                line-height: 1.75rem;
                font-weight: 700;
                text-align: center;
                width: 100%;
            }
            .table-wrapper {
                width: 100%;
            }
            .title-cell {
                text-align: center;
                width: 100%;
            }
            .cell {
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                text-align: center;
                border-width: 1px;
                border-color: #000000;
                border-style: solid;
            }
            .customer-cell {
                padding-left: 0.5rem;
                padding-right: 0.5rem;
            }
            .font-bold {
                font-weight: bold;
            }
            .footing {
                display: flex;
                margin-bottom: 3rem;
                margin-top: 4rem;
                justify-content: space-between;
                align-items: flex-end;
            }
            .signature {
                margin-bottom: 0.5rem;
                border-color: #000000;
            }
            .company-representative-wrapper {
                margin-bottom: 4rem;
            }
            .customer-header {
                min-width: 124px;
            }
            .customer-content {
                min-width: 248px;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="upper">
                <div class="logo">
                    <img class="logo" src="data:image/png;base64, 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" />
                </div>
                <div>
                    <table class="table">
                        <tbody>
                        {{CustomerRepresentativeTable}}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="order-title">
                <div>Reklamos paslaugų teikimo pasiūlymas</div>
            </div>
            <div class="table-wrapper">
                <table class="table" style="width: 100%">
                    <tbody>
                    <tr class="title-cell">
                        <td
                                class="cell"
                                colSpan="100%"
                        >
                            Užsakymo informacija
                        </td>
                    </tr>
                    <tr>
                        <th class="cell">
                            Produktas
                        </th>
                        <th class="cell">
                            Kiekis<sup>1</sup>
                        </th>
                        <th class="cell">
                            Savaitės
                        </th>
                        <th class="cell">
                            (Savaitinė) kaina
                        </th>
                        <th class="cell">
                            Suma Gross
                        </th>
                        <th class="cell">
                            Nuolaida
                        </th>
                        <th class="cell">
                            Vnt. kaina su nuolaida
                        </th>
                        <th class="cell">
                            Suma Net
                        </th>
                    </tr>
                    <tr><td>{{OrderedItems}}</td></tr>
                    <tr>
                        <td colSpan=6></td>
                        <td
                                colSpan=2
                                class="cell font-bold"
                        >
                            Bendra Suma
                        </td>
                    </tr>
                    <tr>
                        <td colSpan=6>
                            <sup style="margin-left: 0.5rem">1</sup> Užsakomos plokštumos
                            detalizuojamos priede nr. 1 po sąmatos patvirtinimo
                        </td>
                        <td class="cell font-bold">
                            Suma be PVM
                        </td>
                        <td class="cell">
                            {{TotalNoVat}}€
                        </td>
                    </tr>
                    <tr>
                        <td colSpan=6>
                            {{PlaneCalculationTooltip}}
                        </td>
                        <td class="cell font-bold">
                            PVM 21%
                        </td>
                        <td class="cell">
                            {{TotalOnlyVat}}€
                        </td>
                    </tr>
                    <tr>
                        <td colSpan=6></td>
                        <td class="cell font-bold">
                            Suma su PVM
                        </td>
                        <td class="cell">
                            {{TotalInclVat}}€
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="footing">
                <div class="company-representative-wrapper">
                    {{CompanyRepresentativeTable}}
                </div>
                <div style="width:300px">
                    <hr class="signature" style="color:gray">
                    <div style="text-align: center; font-size: small;">
                        <div>
                            Patvirtinto kliento atstovas
                        </div>
                        <div style="font-style:italic">(Vardas, Pavardė, pareigos, parašas)</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
""";
}