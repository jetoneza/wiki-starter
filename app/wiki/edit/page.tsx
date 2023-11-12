import { PageProps } from "@/.next/types/app/layout";
import { getPage } from "@/api/data";

import Form from "@/app/components/Form";

export default async function Edit({ searchParams }: PageProps) {
  const page = await getPage(searchParams);

  if (!page) {
    // TODO: Handle if no page found
    return null;
  }

  return (
    <Form searchParams={{ ...searchParams, type: page.type }} {...page} edit />
  );
}
