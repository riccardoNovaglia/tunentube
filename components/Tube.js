import { useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";

export default function Tube() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef();
  const start = 5;
  const end = 10;

  function onProgress({ playedSeconds }) {
    if (playedSeconds >= end) {
      playerRef.current.seekTo(start);
    }
  }
  return (
    <>
      <ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=M7lc1UVf-VE"
        controls={false}
        playing={playing}
        volume={volume}
        onProgress={onProgress}
        onPause={() => playing && setPlaying(false)}
        onStart={() => !playing && setPlaying(true)}
      />
      <p>Tube</p>
      <button onClick={(e) => setPlaying(!playing)}>play/pause</button>
      <button onClick={(e) => playerRef.current.seekTo(start)}>start</button>
      <button onClick={(e) => playerRef.current.seekTo(end)}>end</button>
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
    </>
  );
}
