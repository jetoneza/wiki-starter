import crypto from "crypto";
import data from "@/data/data";
import metadata from "@/data/metadata";

export async function getMetadata() {
  return metadata;
}

export async function getCategories() {
  return data.filter((data) => data.type === "category");
}

export async function getData(params: Params) {
  const { category, topic, content } = params;

  const key = `${category}:${topic}:${content}`;

  const hash = crypto.createHash("sha256").update(key).digest("hex");

  const pageData = data.find((page) => page.id === hash);

  return pageData;
}
