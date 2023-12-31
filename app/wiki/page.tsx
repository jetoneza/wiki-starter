// Libs
import Link from "next/link";

// API
import { getCategories } from "@/api/data";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/wiki/${category.path}`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {category.label}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50 line-clamp-3">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
