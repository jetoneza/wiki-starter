import { PrismaClient } from "@prisma/client";

import { createHashFromParams } from "@/utils/content";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getFileData, writeToFile } from "@/utils/file";

const prisma = new PrismaClient();

export async function getMetadata() {
  const metadata = await getFileData();

  return metadata;
}

export async function getCategories() {
  const pages = await prisma.page.findMany({
    where: {
      type: {
        equals: "category",
      },
    },
  });

  return pages;
}

export async function getData(params: Params) {
  const hash = createHashFromParams(params);

  const pageData = await prisma.page.findFirst({
    where: {
      pathHash: hash,
    },
  });

  return pageData;
}

export async function createPage(data: any) {
  const hash = createHashFromParams(data.params as Params);

  const { path, label, description, content, type } = data;

  const page = await prisma.page.create({
    data: {
      pathHash: hash,
      path,
      label,
      description,
      content,
      type,
    },
  });

  await updateMetadata(hash, data);

  return page;
}

async function updateMetadata(hash: string, data: any) {
  const metadata = await getFileData();

  if (data.type === "category") {
    metadata.push({
      id: hash,
      path: data.path,
      label: data.label,
      topics: [],
    });
  }

  await writeToFile(metadata);
}
