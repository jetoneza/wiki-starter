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

  const pageData = await prisma.page.findUnique({
    where: {
      id: hash
    },
  });

  return pageData;
}

export async function createPage(data: any) {
  const hash = createHashFromParams(data as Params);

  // TODO: Implement create
}
