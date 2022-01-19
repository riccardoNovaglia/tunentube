import { useState, useRef } from "react";
import { Slider } from "@reach/slider";
import ReactPlayer from "react-player/youtube";

import "@reach/slider/styles.css";
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
          url={videoToPlay}
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
          light={true}
        />
        {/* TODO: actually control volume and progress, add speed etc */}
        <Slider orientation="vertical" className={styles.volume} {...fadeInOut} />
        <Slider orientation="horizontal" className={styles.progress} {...fadeInOut} />
      </div>
    </div>
  );

  function goTo(seconds) {
    playerRef.current.seekTo(seconds);
  }
}
