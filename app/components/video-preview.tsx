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
      <img className="mb-2" src={thumbnailUrl} />
      <p className="font-bold">{title}</p>
      <p className="mb-2 text-sm text-gray-700">
        {duration} &bull; {views}
      </p>
    </a>
  );
}
