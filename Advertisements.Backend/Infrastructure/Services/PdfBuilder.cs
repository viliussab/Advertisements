using Core.Vendor;
using SelectPdf;
namespace Infrastructure.Services;

public class PdfBuilder : IPdfBuilder
{
    public byte[] BuildFromHtml(string html)
    {
        var pdfConverter = new HtmlToPdf();
        var document = pdfConverter.ConvertHtmlString(html);
        var pdfBytes = document.Save();

        return pdfBytes;
    }
}