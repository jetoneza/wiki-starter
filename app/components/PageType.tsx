"use client";

import { ChangeEvent, useState } from "react";

type PageTypeProps = {
  type: string;
  category?: string;
  topic?: string;
  metadata: any;
};

export default function PageType({
  type,
  category,
  metadata,
  topic,
}: PageTypeProps) {
  const [pageType, setType] = useState(type);
  const [pageCategory, setCategory] = useState(category);
  const [pageTopic, setTopic] = useState(topic);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setType(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setCategory(e.target.value);
  };

  const handleTopicChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setTopic(e.target.value);
  };

  const renderTopicSelect = () => {
    // TODO: Restrict creation of content if the category selected has no topics

    if (pageType !== "content") {
      return null;
    }

    // TODO: Use appropriate type for metadata
    const category = metadata.find(
      (category: any) => category.path === pageCategory,
    );

    if (!category) {
      return null;
    }

    return (
      <div className="flex flex-col space-y-4 w-full">
        <label className="text-sm font-bold">Topic</label>
        <select
          value={pageTopic}
          name="topic"
          className="rounded-lg border border-gray-400 py-2 px-4"
          onChange={handleTopicChange}
        >
          {category.topics.map((topic: any) => {
            return (
              <option key={topic.id} value={topic.path}>
                {topic.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const renderCategorySelect = () => {
    if (pageType == "category") {
      return null;
    }

    return (
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col space-y-4 w-full">
          <label className="text-sm font-bold">Category</label>
          <select
            value={pageCategory}
            name="category"
            className="rounded-lg border border-gray-400 py-2 px-4"
            onChange={handleCategoryChange}
          >
            {metadata.map((metadata: any) => {
              return (
                <option key={metadata.id} value={metadata.path}>
                  {metadata.label}
                </option>
              );
            })}
          </select>
        </div>
        {renderTopicSelect()}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-4 sm:w-1/2">
        <label className="text-sm font-bold">Page Type</label>
        <select
          defaultValue={type}
          value={pageType}
          name="type"
          className="rounded-lg border border-gray-400 py-2 px-4 mr-3"
          onChange={handleTypeChange}
        >
          <option value="category">Category</option>
          <option value="topic">Topic</option>
          <option value="content">Content</option>
        </select>
      </div>
      {renderCategorySelect()}
    </>
  );
}
