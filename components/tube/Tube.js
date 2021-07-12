import { useRef, useState } from "react";

import ReactPlayer from "react-player/lazy";
import { Slider } from "@reach/slider";
import "@reach/slider/styles.css";

import styles from "./Tube.module.scss";

export default function Tube({ video }) {
  const [playing, setPlaying] = useState(false);
  const [loop, setLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(1);
  const [current, setCurrent] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(duration);

  const [controls, setControls] = useState(false);

  const playerRef = useRef();

  function onProgress({ playedSeconds }) {
    setCurrent(playedSeconds);
    if (loop && playedSeconds >= end) {
      goTo(start);
    }
  }

  return (
    <div className={styles.tube}>
      <div
        className={styles.playerAndControls}
        onMouseEnter={() => setControls(true)}
        onMouseLeave={() => setControls(false)}
      >
        <div className={styles.playerAndProgress}>
          <div className={styles.playerAndVolume}>
            <ReactPlayer
              ref={playerRef}
              className={styles.player}
              url={video}
              controls={false}
              playing={playing}
              volume={volume}
              onProgress={onProgress}
              progressInterval={loop ? 50 : 1000}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onStart={() => setPlaying(true)}
              onPlay={() => setPlaying(true)}
              onReady={() => {
                const duration = playerRef.current.getDuration();
                setDuration(duration);
                setEnd(duration);
              }}
            />
            <Slider
              min={0}
              max={1}
              value={volume}
              onChange={(volume) => setVolume(volume)}
              step={0.1}
              orientation="vertical"
              className={controls ? styles.volume : styles.volumeHidden}
            />
          </div>
          <Slider
            min={0}
            max={duration}
            step={1}
            value={current}
            onChange={(progress) => goTo(progress)}
            orientation="horizontal"
            className={controls ? styles.progress : styles.progressHidden}
          />
        </div>
      </div>
      <p>{Math.round(current)}</p>

      <button onClick={() => setPlaying(!playing)}>play/pause</button>

      <label htmlFor="loop">Loop</label>
      <input id="loop" type="checkbox" value={loop} onChange={(e) => setLooping(e.target.checked)} />
      <Chapters
        loop={loop}
        duration={duration}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        playerRef={playerRef}
      />
    </div>
  );

  function goTo(seconds) {
    setCurrent(seconds);
    playerRef.current.seekTo(seconds);
    // playing && playerRef.current.start();
  }
}

function Chapters({ loop, duration, start, setStart, end, setEnd, playerRef }) {
  const [grabbed, setGrabbed] = useState([]);

  if (!loop) return <></>;

  return (
    <>
      <input type="range" min={0} max={duration} step="1" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="text" value={start} onChange={(e) => setStart(e.target.value)} />
      <p>{start}</p>
      <input type="range" min={0} max={duration} step="1" value={end} onChange={(e) => setEnd(e.target.value)} />
      <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} />
      <p>{end}</p>
      <button onClick={() => setGrabbed([...grabbed, playerRef.current.getCurrentTime()])}>grab</button>
      <ul>
        {grabbed.map((grab) => (
          <li key={grab}>{grab}</li>
        ))}
      </ul>
    </>
  );
}
