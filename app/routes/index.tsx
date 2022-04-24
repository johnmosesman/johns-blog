import { Link } from "@remix-run/react";

import { Article } from "../lib/types/article";
import ArticlePreview from "../components/article-preview";

export default function Index() {
  let articles: Article[] = [
    {
      url: "https://www.freecodecamp.org/news/how-to-become-an-astounding-junior-developer/",
      thumbnailUrl:
        "/images/how-to-become-an-outstanding-junior-developer-thumbnail.jpeg",
      title: "How to Become an Outstanding Junior Developer",
      reads: "68.8k",
      publishedDate: "July 22, 2020",
    },
    {
      url: "https://www.freecodecamp.org/news/practical-git-and-git-workflows/",
      thumbnailUrl: "/images/git-and-git-workflows-thumbnail.jpeg",
      title: "How to Use Git and Git Workflows – a Practical Guide",
      reads: "37.8k",
      publishedDate: "April 1, 2021",
    },
    {
      url: "https://www.freecodecamp.org/news/interviewing-prep-tips-and-tricks/",
      thumbnailUrl: "/images/interview-tips-and-tricks-thumbnail.jpeg",
      title:
        "How to prepare for a technical interview - tips and tricks to help you perform your best",
      reads: "20.3k",
      publishedDate: "September 30, 2019",
    },
  ];

  return (
    <main className="flex flex-col">
      <div className="mb-12">
        <h1 className="mb-2 text-5xl">Hi, I'm John</h1>
        <p className="mb-2">
          I'm a software developer building in the web3 space at{" "}
          <a href="https://zeroxone.xyz" className="underline">
            0x1.
          </a>
        </p>
        <p>I like helping others learn how to become a developer.</p>
      </div>
      <h3 className="mb-4 text-3xl">Video Resources</h3>
      <a
        className="mb-8 block"
        href="https://www.youtube.com/watch?v=lo4BSraYvc8"
        target="_blank"
        rel="noopener"
      >
        <img
          className="mb-2"
          src="/images/how-to-become-a-developer-thumbnail.png"
        />
        <p className="font-bold">How To Become A Developer Talk</p>
        <p className="mb-2 text-sm text-gray-700">37min &bull; 300k views</p>
      </a>
      <a
        className="mb-8 block"
        href="https://www.youtube.com/watch?v=5azUw1Asp20"
        target="_blank"
        rel="noopener"
      >
        <img
          className="mb-2"
          src="/images/how-to-become-a-developer-review-thumbnail.jpeg"
        />
        <p className="font-bold">
          Reviewing my talk "How To Become A Developer" 2.5 years later
        </p>
        <p className="mb-2 text-sm text-gray-700">32min &bull; 6.2k views</p>
      </a>
      <a
        className="mb-4 block"
        href="https://www.youtube.com/watch?v=jV-lAT5jgx0"
        target="_blank"
        rel="noopener"
      >
        <img
          className="border-1 mb-2 border border-gray-300"
          src="/images/dont-need-cs-degree-thumbnail.png"
        />
        <p className="font-bold">
          Why you don't need a computer science degree to program
        </p>
        <p className="mb-2 text-sm text-gray-700">30min &bull; 1.3k views</p>
      </a>
      <a
        className="mb-12 block underline"
        href="https://www.youtube.com/channel/UCmRIxrzO2UlTOUC57HXxmCA"
      >
        View all videos
      </a>

      <h3 className="mb-4 text-3xl">Writing Resources</h3>

      {articles.map((article, index) => {
        return <ArticlePreview key={index} {...article} />;
      })}

      <Link className="mb-12 block underline" to="writings">
        View all writings
      </Link>
    </main>
  );
}
