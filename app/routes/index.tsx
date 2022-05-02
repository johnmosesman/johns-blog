import { Link } from "@remix-run/react";

import type { Article } from "../lib/types/article";
import type { Video } from "../lib/types/video";

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
    <main className="flex flex-col ">
      <div className="mb-12 md:mb-20">
        <h1 className="mb-2 text-3xl md:mb-4 md:text-5xl">
          Hi, I'm John Mosesman
        </h1>

        <div>
          <p className="mb-2 md:text-xl">
            I'm a software developer building web3 at{" "}
            <a
              href="https://0x1.software"
              className="border-1 border-b border-gray-900"
            >
              0x1
            </a>
            .
          </p>
          <p className="md:text-xl">
            I like helping others succeed as a developer.
          </p>
        </div>
      </div>

      <h3 className="mb-4 text-2xl md:mb-8 md:text-3xl">Latest Article</h3>

      <Link
        to="/writings/a-practical-take-on-web3"
        className="mb-16 lg:flex lg:flex-row lg:items-center"
      >
        <img
          src="/images/a-practical-take-on-web3-thumbnail-min.png"
          className="border-1 mx-auto mb-4 rounded border border-gray-300 lg:mb-0 lg:w-2/5"
        />

        <div className="lg:ml-12 lg:w-3/5">
          <p className="mb-2 text-xl md:text-2xl lg:text-3xl">
            A practical take on web3
          </p>
          <p className="mb-2 text-sm text-gray-700 md:text-lg">
            Even just <i>seeing</i> the image above likely invokes strong
            emotion.
          </p>
          <p className="mb-2 text-sm text-gray-700 md:text-lg">
            At this point I think most of us have heard of
            web3/cryptocurrencies. Without looking far you’ll see every
            imaginable take on the topic.
          </p>
          <p className="mb-2 text-sm text-gray-700 md:text-lg">
            It is possible to be excited for the future of a technology,
            participate in it, and also see it for what it is?
          </p>
          <p className="mb-2 text-sm text-gray-700 md:text-lg">
            I hope so, and the entire point of this post is to attempt to give
            just that: <strong>a practical take on web3...</strong>
          </p>
          <p className="text-sm text-gray-700 underline md:text-lg">
            Read the full article
          </p>
        </div>
      </Link>

      <h3 className="mb-4 text-2xl md:mb-8 md:text-3xl">Video Resources</h3>

      <div className="lg:grid lg:grid-cols-3">
        {videos.map((video, index) => {
          return <VideoPreview key={index} {...video} />;
        })}
      </div>

      <a
        className="mb-12 block underline md:text-2xl lg:text-lg"
        href="https://www.youtube.com/channel/UCmRIxrzO2UlTOUC57HXxmCA"
      >
        View all videos
      </a>

      <h3 className="mb-4 mt-8 text-2xl md:mb-8 md:text-3xl">
        Writing Resources
      </h3>

      <div className="lg:grid lg:grid-cols-3">
        {articles.map((article, index) => {
          return <ArticlePreview key={index} {...article} />;
        })}
      </div>

      <Link
        className="mb-12 block underline md:text-2xl lg:text-lg"
        to="writings"
      >
        View all writings
      </Link>
    </main>
  );
}
