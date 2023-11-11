import data from "@/data/data";
import metadata from "@/data/metadata";
import { createHashFromParams } from "@/utils/content";

export async function getMetadata() {
  return metadata;
}

export async function getCategories() {
  return data.filter((data) => data.type === "category");
}

export async function getData(params: Params) {
  const hash = createHashFromParams(params);

  const pageData = data.find((page) => page.id === hash);

  return pageData;
}

export async function createPage(data: any) {
  const hash = createHashFromParams(data as Params);

  data.push({
    ...data,
    id: hash,
  });

  if (data.type === "category") {
    metadata.push({
      id: hash,
      path: data.path,
      label: data.label,
      topics: [],
    });
  }

  // TODO: Add for others
}
