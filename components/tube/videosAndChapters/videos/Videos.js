import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { UrlInput } from "./UrlInput";
import styles from "./Videos.module.scss";

export function Videos({ setVideo }) {
  const [videos, setVideos] = useState(startVideos);
  useEffect(() => {
    setVideo(videos[0]);
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
        name
      `);
      if (videos && videos.length > 0) {
        setVideos(videos);
      } else {
        console.error(error, status);
      }
    }
    fetch();
  }, []);

  if (!videos) return <></>;

  return (
    <div className={styles.videos}>
      <ul>
        {videos.map((video) => (
          <li key={video.url}>
            <a
              href={video.url}
              key={video.id}
              onClick={(event) => {
                event.preventDefault();
                setVideo(video);
              }}
            >
              {video.name}
            </a>
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
    id: 991,
    name: "Redbone",
  },
  {
    url: "https://www.youtube.com/watch?v=vVSn1xindPM",
    id: 992,
    name: "Californication",
  },
  {
    url: "https://www.youtube.com/watch?v=XUTCU3v22GI",
    id: 993,
    name: "Otherside",
  },
  {
    url: "https://www.youtube.com/watch?v=5_SUiiOJtL8",
    id: 994,
    name: "Breathe",
  },
  {
    url: "https://www.youtube.com/watch?v=qs9KVyJnKIU",
    id: 995,
    name: "Feeling good",
  },
];
