import { HtmlMetaDescriptor } from "@remix-run/server-runtime";

let defaultTitle: string = "John Mosesman";
let defaultDescription: string =
  "I'm a software developer building web3 at 0x1. I like helping others succeed as a developer.";
let defaultImage = "";

const buildMeta = (
  title: string = defaultTitle,
  description: string = defaultDescription,
  image: string = defaultImage
): HtmlMetaDescriptor => {
  image = `https://johnmosesman.com${image}`;

  return {
    charset: "utf-8",
    title: title,
    viewport: "width=device-width,initial-scale=1",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:site": "@johnmosesman",
    "twitter:creator": "@johnmosesman",
    "twitter:image": image,
    "og:type": "article",
    "og:title": title,
    "og:description": description,
    "og:url": "https://johnmosesman.com",
    "og:site_name": "John Mosesman",
    "og:image": image,
  };
};

export default buildMeta;
