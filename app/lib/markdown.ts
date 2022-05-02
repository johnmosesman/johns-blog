import { marked } from "marked";
import matter, { type GrayMatterFile } from "gray-matter";
import toml from "toml";

import fs from "fs";

// @ts-ignore
import strftime from "strftime";

export interface MarkdownFile {
  slug: string;
  title: string;
  date: string;
  html: string;
}

const fsPromises = fs.promises;

export const buildMarkdownFile = async (
  directoryPath: string,
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

export const buildMarkdownFiles = async (
  directoryPath: string
): Promise<MarkdownFile[]> => {
  let fileNames: string[] = await fsPromises.readdir(directoryPath);

  let data: MarkdownFile[] = await Promise.all(
    fileNames
      .filter((fileName: string): boolean => fileName.includes(".md"))
      .map(
        async (fileName: string): Promise<MarkdownFile> =>
          buildMarkdownFile(directoryPath, fileName)
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
