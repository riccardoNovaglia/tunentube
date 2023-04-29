import { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";

import styles from "./Player.module.scss";

export function Player({ videoToPlay, activeChapter }) {
  const [playing, setPlaying] = useState(false);
  const [ctrl, setCtrl] = useState(false);
  const playerRef = useRef();

  const fadeInOut = {
    onFocus: () => setCtrl(true),
    onBlur: () => setCtrl(false),
  };

  return (
    <div
      style={{
        "--control-visibility": ctrl ? "100%" : "0%",
      }}
      className={styles.video}
      onMouseEnter={() => setCtrl(true)}
      onMouseLeave={() => setCtrl(false)}
    >
      <div className={styles.playerWrapper}>
        <ReactPlayer
          className={styles.player}
          ref={playerRef}
          url={videoToPlay?.url}
          playing={playing}
          controls={true}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onProgress={({ playedSeconds }) =>
            activeChapter?.outsideBounds(playedSeconds) && goTo(activeChapter?.start)
          }
          progressInterval={50}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );

  function goTo(seconds) {
    playerRef.current.seekTo(seconds);
  }
}
