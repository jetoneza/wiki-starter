import showdown from "showdown";
import crypto from "crypto";

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

export const createHashFromParams = (params: Params) => {
  const { category, topic, content } = params;

  const key = `${category}:${topic}:${content}`;

  return crypto.createHash("sha256").update(key).digest("hex");
};
