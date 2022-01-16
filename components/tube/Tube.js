import { useEffect, useRef, useState } from "react";
import { Slider } from "@reach/slider";

import ReactPlayer from "react-player/lazy";

import { Chapters } from "./chapters/Chapters";
import { UrlInput } from "./UrlInput";

import styles from "./Tube.module.scss";
import "@reach/slider/styles.css";

export default function Tube({ video }) {
  const [videoToPlay, setVideoToPlay] = useState(video);
  useEffect(() => setVideoToPlay(video), [video]);

  const [playing, setPlaying] = useState(false);

  const [loopBounds, setLoopBounds] = useState();

  const [ctrl, setCtrl] = useState(false);

  const playerRef = useRef();
  const fadeInOut = {
    onFocus: () => setCtrl(true),
    onBlur: () => setCtrl(false),
  };

  return (
    <div
      className={styles.tube}
      style={{
        "--control-visibility": ctrl ? "100%" : "0%",
      }}
      onMouseEnter={() => setCtrl(true)}
      onMouseLeave={() => setCtrl(false)}
    >
      <UrlInput setVideoUrl={setVideoToPlay} />
      <div className={styles.playerWrapper}>
        <ReactPlayer
          className={styles.player}
          ref={playerRef}
          url={videoToPlay}
          playing={playing}
          controls={true}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onProgress={({ playedSeconds }) => loopBounds?.outsideBounds(playedSeconds) && goTo(loopBounds?.getStart())}
          progressInterval={50}
        />
        <Slider orientation="vertical" className={styles.volume} {...fadeInOut} />
        <Slider orientation="horizontal" className={styles.progress} {...fadeInOut} />
      </div>

      <Chapters
        onChapterSelected={({ start, end }) => {
          setLoopBounds({
            getStart: () => Number.parseFloat(start),
            outsideBounds: (currentTime) => currentTime < start || currentTime >= end,
          });
        }}
        onChapterUnselected={() => setLoopBounds(undefined)}
      />
    </div>
  );

  function goTo(seconds) {
    playerRef.current.seekTo(seconds);
  }
}
