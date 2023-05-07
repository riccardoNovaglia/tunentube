import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";

import styles from "./Player.module.scss";

export function Player({ video, activeChapter }) {
  const [playing, setPlaying] = useState(false);
  const [ctrl, setCtrl] = useState(false);
  const playerRef = useRef();

  // To deal with Next hydration issues
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  if (!loaded) return null;

  return (
    <div
      className={styles.playerWrapper}
      style={{
        "--control-visibility": ctrl ? "100%" : "0%",
      }}
      onMouseEnter={() => setCtrl(true)}
      onMouseLeave={() => setCtrl(false)}
    >
      <ReactPlayer
        className="react-player"
        ref={playerRef}
        url={video?.url}
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
  );

  function goTo(seconds) {
    playerRef.current.seekTo(seconds);
  }
}
