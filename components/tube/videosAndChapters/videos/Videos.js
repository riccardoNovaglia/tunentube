import { useEffect } from "react";
import { UrlInput } from "./UrlInput";
import styles from "./Videos.module.scss";

export function Videos({ setVideo }) {
  useEffect(() => {
    setVideo(videos[0].url);
  }, [setVideo]);

  if (!videos) return <></>;

  return (
    <div className={styles.videos}>
      <ul>
        {videos.map((video) => (
          <li key={video.url}>
            <button key={video.url} onClick={() => setVideo(video.url)}>
              {video.title}
            </button>
          </li>
        ))}
      </ul>
      <UrlInput setVideoUrl={setVideo} />
    </div>
  );
}

const videos = [
  {
    url: "https://www.youtube.com/watch?v=XtRifYMxXXw",
    title: "Redbone",
  },
  {
    url: "https://www.youtube.com/watch?v=vVSn1xindPM",
    title: "Californication",
  },
  {
    url: "https://www.youtube.com/watch?v=XUTCU3v22GI",
    title: "Otherside",
  },
  {
    url: "https://www.youtube.com/watch?v=5_SUiiOJtL8",
    title: "Breathe",
  },
  {
    url: "https://www.youtube.com/watch?v=qs9KVyJnKIU",
    title: "Feeling good",
  },
];
