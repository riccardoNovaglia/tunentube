import { useEffect } from "react";
import styles from "./Tunes.module.scss";

export function Tunes({ videos, setVideo }) {
  useEffect(() => {
    setVideo(videos[0].url);
  }, [setVideo, videos]);

  if (!videos) return <></>;

  return (
    <div className={styles.tunes}>
      {videos.map((video) => (
        <button key={video.url} onClick={() => setVideo(video.url)}>
          {video.title}
        </button>
      ))}
    </div>
  );
}
