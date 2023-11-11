import { getData } from "@/api/data";
import { generateHtmlFromMarkdown } from "@/utils/content";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Params }) {
  const data = await getData(params);

  if (!data) {
    return notFound();
  }

  const html = generateHtmlFromMarkdown(data.content);

  return (
    <div className="page p-20">
      <div className="py-20 px-8 border rounded-lg">
        <h1 className="text-4xl font-bold text-cyan-600">{data.label}</h1>
        <p className="text-gray-700">{data.description}</p>
        <article
          className="prose mt-10 prose-img:mx-auto prose-img:rounded-md max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
