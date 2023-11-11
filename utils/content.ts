import showdown from "showdown";

export const generateHtmlFromMarkdown = (markdown: string): string => {
  const converter = new showdown.Converter();

  // TODO: HTML Cleansing

  return converter.makeHtml(markdown);
};
