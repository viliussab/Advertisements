namespace API.Pkg.HtmlToPdf;

public class HtmlToPdf
{
    public byte[] Convert(string html)
    {
        var pdfConverter = new SelectPdf.HtmlToPdf();
        var document = pdfConverter.ConvertHtmlString(html);
        var pdfBytes = document.Save();

        return pdfBytes;
    }
}