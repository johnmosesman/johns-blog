import { Article } from "../lib/types/article";

export default function ArticlePreview({
  url,
  thumbnailUrl,
  title,
  reads,
  publishedDate,
}: Article) {
  return (
    <a
      className="mb-8 block md:mb-12 lg:max-w-xs"
      href={url}
      target="_blank"
      rel="noopener"
    >
      <img
        className="border-1 mb-2 w-full rounded border border-gray-300 object-cover"
        src={thumbnailUrl}
        style={{ maxHeight: "213px" }}
      />
      <p className="font-bold md:text-2xl md:font-semibold lg:text-lg">
        {title}
      </p>
      <div className="mb-2 flex flex-row items-center text-sm text-gray-700 md:text-lg ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 inline-block h-4 w-4 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <p className="md:text-lg lg:text-sm">
          {reads} &bull; {publishedDate}{" "}
        </p>
      </div>
    </a>
  );
}
