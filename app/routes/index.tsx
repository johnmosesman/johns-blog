import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="">
      <div className="mb-12">
        <h1 className="mb-2 text-5xl">Hi, I'm John</h1>
        <p className="mb-2">
          I'm a software developer building apps from 0 to 1 in the web3 space
          at{" "}
          <Link to="https://zeroxone.xyz" className="underline">
            0x1.
          </Link>
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
        className="mb-8 block"
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

      <a
        className="mb-8 block"
        href="https://www.freecodecamp.org/news/how-to-become-an-astounding-junior-developer/"
        target="_blank"
        rel="noopener"
      >
        <img
          className="border-1 mb-2 border border-gray-300"
          src="/images/how-to-become-an-outstanding-junior-developer-thumbnail.jpeg"
        />
        <p className="font-bold">
          How to Become an Outstanding Junior Developer
        </p>
        <p className="mb-2 text-sm text-gray-700">July 22, 2020</p>
      </a>
      <a
        className="mb-8 block"
        href="https://www.freecodecamp.org/news/how-to-become-an-astounding-junior-developer/"
        target="_blank"
        rel="noopener"
      >
        <img
          className="border-1 mb-2 border border-gray-300"
          src="/images/interview-tips-and-tricks-thumbnail.jpeg"
        />
        <p className="font-bold">
          How to prepare for a technical interview - tips and tricks to help you
          perform your best
        </p>
        <p className="mb-2 text-sm text-gray-700">September 30, 2019</p>
      </a>
      <a
        className="mb-8 block"
        href="https://www.freecodecamp.org/news/practical-git-and-git-workflows/"
        target="_blank"
        rel="noopener"
      >
        <img
          className="border-1 mb-2 border border-gray-300"
          src="/images/git-and-git-workflows-thumbnail.jpeg"
        />
        <p className="font-bold">
          How to Use Git and Git Workflows – a Practical Guide
        </p>
        <p className="mb-2 text-sm text-gray-700">April 1, 2021</p>
      </a>
      <a className="mb-12 block underline" href="todo">
        View all writings
      </a>
    </main>
  );
}
