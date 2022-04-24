import { marked } from "marked";
import matter, { GrayMatterFile } from "gray-matter";
import toml from "toml";

import fs from "fs";
const fsPromises = fs.promises;

// @ts-ignore
import strftime from "strftime";

export interface MarkdownFile {
  slug: string;
  title: string;
  date: string;
  html: string;
}

const directoryPath: string = "app/legacy/post";

export const buildMarkdownFile = async (
  fileName: string
): Promise<MarkdownFile> => {
  const file = await fsPromises.readFile(
    `${directoryPath}/${fileName}`,
    "utf8"
  );

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
    date: strftime("%B %e, %Y", new Date(parsedData.data.date)),
    html: marked(parsedData.content),
  };
};

export const buildMarkdownFiles = async (): Promise<MarkdownFile[]> => {
  let fileNames: string[] = await fsPromises.readdir(directoryPath);

  let data: MarkdownFile[] = await Promise.all(
    fileNames
      .filter((fileName: string): boolean => fileName.includes(".md"))
      .map(
        async (fileName: string): Promise<MarkdownFile> =>
          buildMarkdownFile(fileName)
      )
  );

  // Newest first (desc)
  data = data
    .sort((a: MarkdownFile, b: MarkdownFile) => {
      return Date.parse(a.date) > Date.parse(b.date) ? 1 : -1;
    })
    .reverse();

  return data;
};
