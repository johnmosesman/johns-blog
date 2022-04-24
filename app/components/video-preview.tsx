import { Video } from "../lib/types/video";

export default function VideoPreview({
  url,
  thumbnailUrl,
  title,
  duration,
  views,
}: Video) {
  return (
    <a className="mb-8 block" href={url} target="_blank" rel="noopener">
      <img
        className="border-1 mb-2 border border-gray-500"
        src={thumbnailUrl}
      />
      <p className="font-bold md:text-2xl md:font-semibold">{title}</p>
      <p className="mb-2 text-sm text-gray-700 md:text-lg">
        {duration} &bull; {views}
      </p>
    </a>
  );
}
