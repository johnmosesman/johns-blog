import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { buildMarkdownFiles, MarkdownFile } from "~/lib/markdown";

export const loader: LoaderFunction = async (): Promise<MarkdownFile[]> => {
  return await buildMarkdownFiles();
};

export default function Writings() {
  const markdownFiles: MarkdownFile[] = useLoaderData();

  return (
    <main className="flex flex-col">
      <Link to="/" className="mb-2 flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 h-4 w-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="text-sm text-gray-600">Home</span>
      </Link>
      <h1 className="mb-12 text-4xl">Writings</h1>

      {markdownFiles.map((post: MarkdownFile, index: number) => {
        return (
          <Link to={`/post/${post.slug}`} className="mb-6" key={index}>
            <p className="md:text-xl">{post.title}</p>
            <p className="text-sm text-gray-500 md:text-lg">{post.date}</p>
          </Link>
        );
      })}
    </main>
  );
}
