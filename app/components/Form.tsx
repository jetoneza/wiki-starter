// Libs
import { redirect } from "next/navigation";

// Types
import { PageProps } from "@/.next/types/app/layout";

// API
import { createPage, editPage, getMetadata } from "@/api/data";

// Components
import PageType from "@/app/components/PageType";

type FormProps = {
  edit: boolean;
  id: string;
  label?: string;
  description?: string;
  content?: string;
};

export default async function Form({
  searchParams,
  edit,
  id,
  label,
  description,
  content,
}: PageProps & FormProps) {
  const { type, category, topic } = searchParams;

  const metadata = (await getMetadata()) ?? [];

  const path = searchParams[type];

  async function create(formData: FormData) {
    "use server";

    const type = formData.get("type");

    // TODO: Use correct type
    const params: { [key: string]: any } = {};

    if (type === "category") {
      params.category = formData.get("path");
    }

    if (type === "topic") {
      params.category = formData.get("category");
      params.topic = formData.get("path");
    }

    if (type === "content") {
      params.category = formData.get("category");
      params.topic = formData.get("topic");
      params.content = formData.get("path");
    }

    const data = {
      id,
      type: formData.get("type"),
      path: formData.get("path"),
      label: formData.get("label"),
      description: formData.get("description"),
      content: formData.get("content"),
      params,
    };

    const pageRequestFn = edit ? editPage : createPage;

    const page = await pageRequestFn(data);

    // TODO: Handle errors

    let pageUrl = `/wiki/${params.category}`;

    if (type === "topic") {
      pageUrl += `/${params.topic}`;
    }

    if (type === "content") {
      pageUrl += `/${params.topic}/${params.content}`;
    }

    redirect(pageUrl);
  }

  return (
    <div className="page p-20">
      <div className="p-8 border rounded-lg">
        <h1 className="text-4xl font-bold text-cyan-600">
          {edit ? "Edit" : "New"} Page
        </h1>
        <form
          className="mt-10 flex flex-col space-y-8 font-mono"
          action={create}
        >
          <PageType
            type={type}
            category={category}
            topic={topic}
            metadata={metadata}
          />

          <div className="flex flex-col space-y-4">
            <label className="text-sm font-bold">Path</label>
            <input
              type="text"
              name="path"
              defaultValue={path}
              className="rounded-lg border border-gray-400 py-2 px-4"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label className="text-sm font-bold">Label</label>
            <input
              type="text"
              name="label"
              defaultValue={label}
              className="rounded-lg border border-gray-400 py-2 px-4"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label className="text-sm font-bold">Description</label>
            <input
              type="text"
              name="description"
              defaultValue={description}
              className="rounded-lg border border-gray-400 py-2 px-4"
              required
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label className="text-sm font-bold">Content</label>
            <textarea
              name="content"
              defaultValue={content}
              className="mt-2 rounded-lg border border-gray-400 p-4"
              rows={20}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-700 p-4 rounded-lg w-64 text-white"
          >
            {edit ? "Edit" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
