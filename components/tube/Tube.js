import { useEffect, useRef, useState } from "react";

import ReactPlayer from "react-player/lazy";

import { Chapters } from "./chapters/Chapters";
import { UrlInput } from "./UrlInput";

import styles from "./Tube.module.scss";

export default function Tube({ video }) {
  const [videoToPlay, setVideoToPlay] = useState(video);
  useEffect(() => setVideoToPlay(video), [video]);

  const [playing, setPlaying] = useState(false);

  const [loopBounds, setLoopBounds] = useState();

  const playerRef = useRef();

  return (
    <div className={styles.tube}>
      <UrlInput setVideoUrl={setVideoToPlay} />
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
