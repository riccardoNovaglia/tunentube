import { useState } from "react";

import { Player } from "./player/Player";
import { VideosAndChapters } from "./videosAndChapters/VideosAndChapters";

import styles from "./Tube.module.scss";

export function Tube() {
  const [videoToPlay, setVideoToPlay] = useState();
  const [activeChapter, setActiveChapter] = useState();

  function onChapterTrigger(chapter) {
    setActiveChapter(chapter === activeChapter ? undefined : chapter);
  }

  return (
    <div className={styles.tube}>
      <div className={styles.video}>
        {videoToPlay && (
          <Player activeChapter={activeChapter} videoToPlay={videoToPlay} />
        )}
      </div>
      <div className={styles.videosAndChapters}>
        <VideosAndChapters
          video={videoToPlay}
          setVideoToPlay={setVideoToPlay}
          activeChapter={activeChapter}
          onChapterTrigger={onChapterTrigger}
        />
      </div>
    </div>
  );
}
