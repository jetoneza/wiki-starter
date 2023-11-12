// Libs
import { redirect } from "next/navigation";
import Link from "next/link";

// Utils
import { generateHtmlFromMarkdown, getPageType } from "@/utils/content";

// Types
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// API
import { getPage } from "@/api/data";

export default async function Page({ params }: { params: Params }) {
  const { category, topic, content } = params;
  const data = await getPage(params);

  const paramsLink = `category=${category}&topic=${topic}&content=${content}`;

  if (!data) {
    const type = getPageType(params);

    const redirectUrl = `/wiki/new?type=${type}&${paramsLink}`;

    return redirect(redirectUrl);
  }

  const html = generateHtmlFromMarkdown(data.content);

  return (
    <div className="page p-20">
      <div className="py-10 px-8 border rounded-lg drop-shadow-2xl">
        <Link
          href={`/wiki/edit?${paramsLink}`}
          className="absolute top-8 right-8 text-sm text-cyan-600"
        >
          Edit
        </Link>
        <div className="header flex flex-col space-y-4">
          <h1 className="text-4xl font-bold text-cyan-600">{data.label}</h1>
          <p className="text-gray-700">{data.description}</p>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <article
          className="prose mt-10 prose-img:mx-auto prose-img:rounded-md max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
