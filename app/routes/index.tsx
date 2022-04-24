import { Link } from "@remix-run/react";

import { Article } from "../lib/types/article";
import { Video } from "../lib/types/video";

import ArticlePreview from "../components/article-preview";
import VideoPreview from "~/components/video-preview";

export default function Index() {
  let videos: Video[] = [
    {
      url: "https://www.youtube.com/watch?v=lo4BSraYvc8",
      thumbnailUrl: "/images/how-to-become-a-developer-thumbnail.png",
      title: "How To Become A Developer Talk",
      duration: "37min",
      views: "300k views",
    },
    {
      url: "https://www.youtube.com/watch?v=5azUw1Asp20",
      thumbnailUrl: "/images/how-to-become-a-developer-review-thumbnail.jpeg",
      title: 'Reviewing my talk "How To Become A Developer" 2.5 years later',
      duration: "32min",
      views: "6.2k views",
    },
    {
      url: "https://www.youtube.com/watch?v=jV-lAT5jgx0",
      thumbnailUrl: "/images/dont-need-cs-degree-thumbnail.png",
      title: "Why you don't need a computer science degree to program",
      duration: "30min",
      views: "1.3k views",
    },
  ];

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

      {videos.map((video, index) => {
        return <VideoPreview key={index} {...video} />;
      })}

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
