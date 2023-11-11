import { PageProps } from "@/.next/types/app/layout";
import { createPage } from "@/api/data";
import { redirect } from "next/navigation";

export default async function New({ searchParams }: PageProps) {
  const { type, category, topic, content } = searchParams;

  const path = searchParams[type];

  async function create(formData: FormData) {
    "use server";

    const data = {
      type: formData.get("type"),
      path: formData.get("path"),
      label: formData.get("label"),
      description: formData.get("description"),
      content: formData.get("content"),
      params: {
        category,
        topic,
        content,
      },
    };

    const page = await createPage(data);

    // TODO: Handle errors

    redirect(`/wiki/${data.path}`);
  }

  return (
    <div className="page p-20">
      <div className="py-20 px-8 border rounded-lg">
        <h1 className="text-4xl font-bold text-cyan-600">New Page</h1>
        <form className="mt-10 flex flex-col space-y-10" action={create}>
          <div className="block relative w-64">
            <label>Page Type</label>
            <select
              defaultValue={type}
              name="type"
              className="mt-2 block w-full bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="category">Category</option>
              <option value="topic">Topic</option>
              <option value="content">Content</option>
            </select>
          </div>

          <div className="flex flex-col space-y-4">
            <label>Path</label>
            <input
              type="text"
              name="path"
              defaultValue={path}
              className="rounded-lg border border-gray-400 py-2 px-4"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label>Label</label>
            <input
              type="text"
              name="label"
              className="rounded-lg border border-gray-400 py-2 px-4"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="rounded-lg border border-gray-400 py-2 px-4"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label>Content</label>
            <textarea
              name="content"
              className="mt-2 rounded-lg border border-gray-400 p-4"
              rows={20}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-700 p-4 rounded-lg w-64 text-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
