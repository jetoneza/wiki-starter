import { getMetadata } from "@/api/data";
import Link from "next/link";

export default async function Sidebar() {
  const data = (await getMetadata()) ?? [];

  return (
    <aside className="side-nav fixed bg-zinc-100 top-0 left-0 z-40 w-64 h-screen border-r flex flex-col p-8 font-open-sans">
      {data.map((category: any) => (
        <Link
          href={`/wiki/${category.path}`}
          key={category.id}
          className="mb-4"
        >
          <span className="font-semibold text-cyan-600 text-lg">
            {category.label}
          </span>
          {category.topics.map((topic: any) => (
            <Link
              href={`/wiki/${category.path}/${topic.path}`}
              key={topic.id}
              className="block"
            >
              <span className="font-semibold text-gray-800">{topic.label}</span>
              {topic.contents.map((content: any) => (
                <Link
                  href={`/wiki/${category.path}/${topic.path}/${content.path}`}
                  key={content.id}
                  className="block"
                >
                  <span className="font-semibold text-gray-500 text-sm ml-4">
                    {content.label}
                  </span>
                </Link>
              ))}
            </Link>
          ))}
        </Link>
      ))}
    </aside>
  );
}
