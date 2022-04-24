import { Video } from "../lib/types/video";

export default function VideoPreview({
  url,
  thumbnailUrl,
  title,
  duration,
  views,
}: Video) {
  return (
    <a
      className="mb-8 block md:mb-12 lg:max-w-xs"
      href={url}
      target="_blank"
      rel="noopener"
    >
      <img
        className="border-1 mb-2 rounded border border-gray-500"
        src={thumbnailUrl}
      />
      <p className="font-bold md:text-2xl md:font-semibold lg:text-lg">
        {title}
      </p>
      <p className="mb-2 text-sm text-gray-700 md:text-lg lg:text-sm">
        {duration} &bull; {views}
      </p>
    </a>
  );
}
