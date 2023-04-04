namespace Core.Interfaces;

public interface IPdfBuilder
{
    byte[] BuildFromHtml(string html);
}