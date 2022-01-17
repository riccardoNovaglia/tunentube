import { useState } from "react";

import { Player } from "./player/Player";
import { VideosAndChapters } from "./videosAndChapters/VideosAndChapters";

import styles from "./Tube.module.scss";

export default function Tube() {
  const [videoToPlay, setVideoToPlay] = useState();
  const [activeChapter, setActiveChapter] = useState();

  return (
    <div className={styles.tube}>
      {videoToPlay && (
        <div className={styles.video}>
          <Player activeChapter={activeChapter} videoToPlay={videoToPlay} />
        </div>
      )}
      <div className={styles.videosAndChapters}>
        <VideosAndChapters
          setVideoToPlay={setVideoToPlay}
          activeChapter={activeChapter}
          setActiveChapter={setActiveChapter}
        />
      </div>
    </div>
  );
}
