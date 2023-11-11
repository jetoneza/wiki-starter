import { getData } from "@/api/data";
import { generateHtmlFromMarkdown, getPageType } from "@/utils/content";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Params }) {
  const data = await getData(params);

  if (!data) {
    const { category, topic, content } = params;

    const type = getPageType(params);

    const redirectUrl = `/wiki/new?type=${type}&category=${category}&topic=${topic}&content=${content}`;

    return redirect(redirectUrl);
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
