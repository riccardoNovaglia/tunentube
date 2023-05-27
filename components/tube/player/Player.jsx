import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";

import styles from "./Player.module.scss";
import { Speed } from "./controls/speed";

export function Player({ video, activeChapter, onDuration }) {
  const [playing, setPlaying] = useState(false);
  const [ctrl, setCtrl] = useState(false);

  const [speed, setSpeed] = useState(1);

  const playerRef = useRef();

  // To deal with Next hydration issues
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  if (!loaded) return null;

  return (
    <>
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
          playbackRate={speed}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onProgress={({ playedSeconds }) =>
            activeChapter?.outsideBounds(playedSeconds) && goTo(activeChapter?.start)
          }
          onDuration={onDuration}
          progressInterval={50}
          width="100%"
          height="100%"
        />
      </div>
      <Speed speed={speed} onSpeedChange={setSpeed} />
      <hr className={styles.divider} />
    </>
  );

  function goTo(seconds) {
    playerRef.current.seekTo(seconds);
  }
}
