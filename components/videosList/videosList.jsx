import Link from "next/link";

export function VideosList({ videos }) {
  return (
    <ul>
      {videos.map((video) => {
        return (
          <li key={video.id}>
            <Link href={`videos/${video.id}`}>{video.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
