import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import fs from "fs";
const fsPromises = fs.promises;

import matter, { GrayMatterFile } from "gray-matter";
import toml from "toml";

// @ts-ignore
import strftime from "strftime";

interface MarkdownFile {
  slug: string;
  title: string;
  date: string;
  content: string;
}

const buildMarkdownFile = async (
  directory: string,
  fileName: string
): Promise<MarkdownFile> => {
  const file = await fsPromises.readFile(`${directory}/${fileName}`, "utf8");

  let parsedData: GrayMatterFile<string> = matter(file, {
    delimiters: "+++",
    language: "toml",
    engines: {
      toml: toml.parse.bind(toml),
    },
  });

  return {
    slug: fileName.replace(".md", ""),
    title: parsedData.data.title,
    date: parsedData.data.date,
    content: parsedData.content,
  };
};

const buildLegacyData = async (): Promise<MarkdownFile[]> => {
  let directory: string = "app/legacy/post";

  let fileNames: string[] = await fsPromises.readdir(directory);

  let data: MarkdownFile[] = await Promise.all(
    fileNames
      .filter((fileName: string): boolean => fileName.includes(".md"))
      .map(
        async (fileName: string): Promise<MarkdownFile> =>
          buildMarkdownFile(directory, fileName)
      )
  );

  // Sort descending
  data = data.sort((a: MarkdownFile, b: MarkdownFile) =>
    a.date > b.date ? -1 : 1
  );

  return data;
};

export const loader: LoaderFunction = async (): Promise<MarkdownFile[]> => {
  let legacyData: MarkdownFile[] = await buildLegacyData();

  console.log(legacyData);

  return legacyData;
};

export default function Writings() {
  const markdownFiles: MarkdownFile[] = useLoaderData();

  return (
    <main className="flex flex-col">
      <h1 className="mb-4 text-3xl">Writings</h1>

      {markdownFiles.map((post: MarkdownFile, index: number) => {
        return (
          <Link to={`/post/${post.slug}`} className="mb-6" key={index}>
            <p className="font-semibold">{post.title}</p>
            <p className="text-sm text-gray-700">
              {strftime("%B %e, %Y", new Date(post.date))}
            </p>
          </Link>
        );
      })}
    </main>
  );
}
