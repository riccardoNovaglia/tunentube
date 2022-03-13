import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { UrlInput } from "./UrlInput";
import styles from "./Videos.module.scss";

export function Videos({ setVideo }) {
  const [videos, setVideos] = useState(startVideos);
  useEffect(() => {
    setVideo(videos[0].url);
  }, [setVideo, videos]);

  useEffect(() => {
    async function fetch() {
      const {
        data: videos,
        error,
        status,
      } = await supabase.from("videos").select(`
        id,
        url,
        song (
          title
        )
      `);
      setVideos(videos);
    }
    fetch();
  }, []);

  if (!videos) return <></>;

  return (
    <div className={styles.videos}>
      <ul>
        {videos.map((video) => (
          <li key={video.url}>
            <button key={video.id} onClick={() => setVideo(video.url)}>
              {video.song.title}
            </button>
          </li>
        ))}
      </ul>
      <UrlInput setVideoUrl={setVideo} />
    </div>
  );
}

const startVideos = [
  {
    url: "https://www.youtube.com/watch?v=XtRifYMxXXw",
    id: "https://www.youtube.com/watch?v=XtRifYMxXXw",
    song: { title: "Redbone" },
  },
  {
    url: "https://www.youtube.com/watch?v=vVSn1xindPM",
    id: "https://www.youtube.com/watch?v=vVSn1xindPM",
    song: { title: "Californication" },
  },
  {
    url: "https://www.youtube.com/watch?v=XUTCU3v22GI",
    id: "https://www.youtube.com/watch?v=XUTCU3v22GI",
    song: { title: "Otherside" },
  },
  {
    url: "https://www.youtube.com/watch?v=5_SUiiOJtL8",
    id: "https://www.youtube.com/watch?v=5_SUiiOJtL8",
    song: { title: "Breathe" },
  },
  {
    url: "https://www.youtube.com/watch?v=qs9KVyJnKIU",
    id: "https://www.youtube.com/watch?v=qs9KVyJnKIU",
    song: { title: "Feeling good" },
  },
];
