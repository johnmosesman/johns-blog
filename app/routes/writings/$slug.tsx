import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { buildMarkdownFile, type MarkdownFile } from "~/lib/markdown";

import styles from "~/styles/post-slug.css";
import buildMeta from "~/lib/meta";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = ({ data }: { data: MarkdownFile }) => {
  let title: string = data.title;
  let description: string | undefined = data.description;
  let image: string | undefined = data.thumbnail;

  return buildMeta(title, description, image);
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<MarkdownFile> => {
  let markdownFile: MarkdownFile = await buildMarkdownFile(
    "app/lib/posts",
    `${params.slug}.md` || ""
  );

  return markdownFile;
};

export default function WritingSlug() {
  const markdownFile: MarkdownFile = useLoaderData();

  return (
    <main className="lg:mx-auto lg:max-w-3xl">
      <Link to="/writings" className="mb-2 flex flex-row items-center">
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
        <span className="text-sm text-gray-600">Writings</span>
      </Link>
      <h1 className="mb-2 text-3xl">{markdownFile.title}</h1>
      <p className="mb-8 text-sm text-gray-700">{markdownFile.date}</p>
      <div
        className="post-slug"
        dangerouslySetInnerHTML={{ __html: markdownFile.html }}
      />
    </main>
  );
}
