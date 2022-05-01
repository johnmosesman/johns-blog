import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { buildMarkdownFiles, type MarkdownFile } from "~/lib/markdown";

type LoaderData = {
  posts: MarkdownFile[];
  legacyPosts: MarkdownFile[];
};

export const loader: LoaderFunction = async () => {
  let posts: MarkdownFile[] = await buildMarkdownFiles("app/lib/posts");
  let legacyPosts: MarkdownFile[] = await buildMarkdownFiles("app/legacy/post");

  return json<LoaderData>({ posts: posts, legacyPosts: legacyPosts });
};

export default function Writings() {
  const { posts, legacyPosts } = useLoaderData<LoaderData>();

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

      {posts.map((post: MarkdownFile, index: number) => {
        return (
          <Link to={`/writings/${post.slug}`} className="mb-6" key={index}>
            <p className="md:text-xl">{post.title}</p>
            <p className="text-sm text-gray-500 md:text-lg">{post.date}</p>
          </Link>
        );
      })}

      {legacyPosts.map((post: MarkdownFile, index: number) => {
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
