import { PrismaClient } from "@prisma/client";

import metadata from "@/data/metadata";

import { createHashFromParams } from "@/utils/content";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const prisma = new PrismaClient();

export async function getMetadata() {
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

  return page;
}
