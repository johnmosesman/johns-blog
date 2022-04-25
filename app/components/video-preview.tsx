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
        className="border-1 mb-2 rounded border border-gray-500 md:mb-4"
        src={thumbnailUrl}
      />
      <p className="md:text-2xl lg:text-lg">{title}</p>
      <p className="mb-2 text-sm text-gray-500 md:text-lg lg:text-sm">
        {duration} &bull; {views}
      </p>
    </a>
  );
}
