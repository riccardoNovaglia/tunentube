import Head from "next/head";
import { useState } from "react";
import { supabase } from "../../supabase/client";

import { Chapters } from "components/tube/chapters/Chapters";
import { Player } from "components/tube/player/Player";

import styles from "components/tube/video.module.scss";

export default function Video({ video, chapters: startChapters }) {
  const [activeChapter, setActiveChapter] = useState();
  const [chapters, setChapters] = useState(startChapters);
  const [duration, setDuration] = useState(0);

  async function onChaptesUpdate() {
    const { data: chapters, error } = await getChapters(video.id);
    if (error) console.error(error);
    setChapters(chapters);
  }

  return (
    <>
      <Head>
        <title>{video.name}</title>
      </Head>

      <div className={styles.player}>
        <Player activeChapter={activeChapter} video={video} onDuration={setDuration} />
      </div>

      <div className={styles.chapters}>
        <Chapters
          chapters={chapters}
          onChaptersUpdate={onChaptesUpdate}
          activeChapter={activeChapter}
          onChapterTrigger={(chapter) =>
            chapter.isEqualTo(activeChapter)
              ? setActiveChapter(undefined)
              : setActiveChapter(chapter)
          }
          duration={duration}
          videoId={video.id}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data: videos, error: videoError } = await supabase
    .from("videos")
    .select("*")
    .eq("id", params.id);

  const { data: chapters, error } = await getChapters(params.id);

  if (error || videoError || videos.length === 0) {
    return {
      notFound: true,
    };
  }

  return { props: { video: videos[0], chapters } };
}

async function getChapters(videoId) {
  return await supabase.from("chapters").select("*").eq("video_id", videoId);
}
