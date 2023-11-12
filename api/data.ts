// Libs
import { PrismaClient } from "@prisma/client";

// Types
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// Utils
import { getFileData, writeToFile } from "@/utils/file";
import { createHashFromParams } from "@/utils/content";

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

export async function getPage(params: Params) {
  const hash = createHashFromParams(params);

  const pageData = await prisma.page.findFirst({
    where: {
      pathHash: hash,
    },
  });

  return pageData;
}

export async function createPage(data: any) {
  // TODO: Limit page creation to authorized users only
  // TODO: Validate data

  const hash = createHashFromParams(data.params as Params);

  // TODO: Check for duplicates

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

  await addMetadata(hash, data);

  return page;
}

export async function editPage(data: any) {
  const hash = createHashFromParams(data.params as Params);

  const { id, path, label, description, content, type } = data;

  const page = await prisma.page.update({
    where: {
      id,
    },
    data: {
      path,
      pathHash: hash,
      label,
      description,
      content,
      type,
    },
  });

  // TODO: Fix bug where when providing a new path value will
  //       generate a new entire hash and causes problems when
  //       updating the metadata
  await updateMetadata(hash, data);

  return page;
}

async function addMetadata(hash: string, data: any) {
  const metadata = await getFileData();

  const link = {
    id: hash,
    path: data.path,
    label: data.label,
  };

  if (data.type === "category") {
    metadata.push({
      ...link,
      topics: [],
    });
  }

  if (data.type === "topic") {
    const category = metadata.find(
      (category: any) => category.path === data.params.category,
    );

    category.topics.push({
      ...link,
      contents: [],
    });
  }

  if (data.type === "content") {
    const category = metadata.find(
      (category: any) => category.path === data.params.category,
    );

    const topic = category.topics.find(
      (topic: any) => topic.path === data.params.topic,
    );

    topic.contents.push(link);
  }

  await writeToFile(metadata);
}

async function updateMetadata(hash: string, data: any) {
  const metadata = await getFileData();

  if (data.type === "category") {
    const category = metadata.find((category: any) => category.id === hash);

    category.path = data.path;
    category.label = data.label;
  }

  if (data.type === "topic") {
    const category = metadata.find(
      (category: any) => category.path === data.params.category,
    );

    const topic = category.topics.find((topic: any) => topic.id === hash);

    topic.path = data.path;
    topic.label = data.label;
  }

  if (data.type === "content") {
    const category = metadata.find(
      (category: any) => category.path === data.params.category,
    );

    const topic = category.topics.find(
      (topic: any) => topic.path === data.params.topic,
    );

    const content = topic.contents.find((content: any) => content.id === hash);

    content.path = data.path;
    content.label = data.label;
  }

  await writeToFile(metadata);
}
