import { useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import styles from "./Tube.module.scss";

export default function Tube() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(1);
  const [current, setCurrent] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(duration);

  const playerRef = useRef();

  function onProgress({ playedSeconds }) {
    if (playedSeconds >= end) {
      goTo(start);
    }
  }

  return (
    <div className={styles.tube}>
      <ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=M7lc1UVf-VE"
        controls={false}
        playing={playing}
        volume={volume}
        onProgress={onProgress}
        onPause={() => playing && setPlaying(false)}
        onStart={() => !playing && setPlaying(true)}
        onReady={() => {
          const duration = playerRef.current.getDuration();
          setDuration(duration);
          setEnd(duration);
        }}
      />
      <div className={styles.tubeControls}>
        <button onClick={() => setPlaying(!playing)}>play/pause</button>
        <button onClick={() => goTo(start)}>start</button>
        <button onClick={() => goTo(end)}>end</button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
        />
        <input type="range" min={0} max={duration} step="1" value={current} onChange={(e) => goTo(e.target.value)} />
        <input type="range" min={0} max={duration} step="1" value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="range" min={0} max={duration} step="1" value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>
    </div>
  );

  function goTo(seconds) {
    setCurrent(seconds);
    playerRef.current.seekTo(seconds);
    setPlaying(true);
  }
}
