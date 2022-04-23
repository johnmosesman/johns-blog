import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import fs from "fs";
import matter, { GrayMatterFile } from "gray-matter";
import toml from "toml";

// @ts-ignore
import strftime from "strftime";

const buildLegacyData = async (): Promise<GrayMatterFile<string>[]> => {
  let directory: string = "app/legacy/post";
  let data: GrayMatterFile<string>[] = [];

  const fsPromises = fs.promises;

  let fileNames: string[] = await fsPromises.readdir(directory);
  console.log("fileNames", fileNames);

  data = await Promise.all(
    fileNames
      .filter((fileName: string): boolean => fileName.includes(".md"))
      .map(async (fileName: string): Promise<GrayMatterFile<string>> => {
        const file = await fsPromises.readFile(
          `${directory}/${fileName}`,
          "utf8"
        );

        let parsedData: GrayMatterFile<string> = matter(file, {
          delimiters: "+++",
          language: "toml",
          engines: {
            toml: toml.parse.bind(toml),
          },
        });
        console.log("parsedData", parsedData);

        return parsedData;
      })
  );

  // Sort descending
  data = data.sort((a, b) => (a.data.date > b.data.date ? -1 : 1));

  console.log("data", data);

  return data;
};

export const loader: LoaderFunction = async () => {
  let legacyData: GrayMatterFile<string>[] = await buildLegacyData();

  console.log("leg", legacyData);
  return json(legacyData);
};

export default function Writings() {
  const data = useLoaderData();
  console.log(data);

  return (
    <main className="flex flex-col">
      <h1 className="mb-4 text-3xl">Archive</h1>

      {data.map((post: GrayMatterFile<string>, index: number) => (
        <div className="mb-4" key={index}>
          <p className="">{post.data.title}</p>
          <p className="text-sm text-gray-700">
            {strftime("%B %e, %Y", new Date(post.data.date))}
          </p>
        </div>
      ))}
    </main>
  );
}
