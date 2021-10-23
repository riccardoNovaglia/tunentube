import { useEffect, useRef, useState } from "react";

import ReactPlayer from "react-player/lazy";

import { Chapters } from "./Chapters";

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
      <div className={styles.player}>
        <ReactPlayer
          ref={playerRef}
          url={videoToPlay}
          playing={playing}
          controls={true}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onProgress={({ playedSeconds }) => loopBounds?.outsideBounds(playedSeconds) && goTo(loopBounds?.getStart())}
          progressInterval={50}
        />
      </div>

      <div>
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
    </div>
  );

  function goTo(seconds) {
    playerRef.current.seekTo(seconds);
  }
}

function UrlInput({ setVideoUrl }) {
  function selectVideo(e) {
    e.preventDefault();
    const [{ value }] = e.target;
    setVideoUrl(value);
  }

  return (
    <form onSubmit={selectVideo}>
      <label htmlFor="url">Url</label>
      <input id="url" type="text" />
      <label htmlFor="selectVideo">Select</label>
      <input id="selectVideo" type="submit" />
    </form>
  );
}
