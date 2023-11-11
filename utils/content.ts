import showdown from "showdown";

export const generateHtmlFromMarkdown = (markdown: string): string => {
  const converter = new showdown.Converter();

  // TODO: HTML Cleansing

  return converter.makeHtml(markdown);
};

export const getPageType = (params: Params) => {
  const { category, topic, content } = params;

  if (category && topic && content) {
    return "content";
  }

  if (category && topic) {
    return "topic";
  }

  if (category) {
    return "category";
  }

  return invalid;
};
