namespace Core.Vendor;

public interface IPdfBuilder
{
    byte[] BuildFromHtml(string html);
}