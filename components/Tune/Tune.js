import { useEffect, useState } from "react";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { useAudio } from "./useAudio";
import { Mics } from "./Mics";
import { getNote } from "./noteFinder";
import styles from "./Tune.module.scss";

export function Tune() {
  const [mic, setMic] = useState();
  const [interval, setTheInterval] = useState();
  const [playback, setPlayback] = useState(false);

  const stopStartRecording = () => {
    if (recording) {
      stopRecording();
      window.clearInterval(interval);
      setTheInterval(undefined);
    } else {
      startRecording({ deviceId: mic, volumeBoost: true, playback });
    }
  };

  const { startRecording, stopRecording, getAudioData, recording } = useAudio();
  return (
    <div className={styles.tune}>
      <div className={styles.controls}>
        <Mics setMic={setMic} disabled={recording} />
        <div className={styles.playback}>
          <label htmlFor="playback">Playback</label>
          <Switch id="playback" checked={playback} onChange={setPlayback} disabled={recording} />
        </div>
      </div>
      <div>
        <label htmlFor="tune">Tune</label>
        <Switch id="tune" checked={recording} onChange={stopStartRecording} />
      </div>
      {recording && <Note getAudioData={getAudioData} setTheInterval={setTheInterval} />}
    </div>
  );
}

function Note({ getAudioData, setTheInterval }) {
  const [note, setNote] = useState(undefined);

  useEffect(() => {
    setTheInterval(
      setInterval(() => {
        const audioData = getAudioData();
        const note = getNote(audioData);
        if (note) {
          setNote(note);
        }
      }, 50)
    );
  }, [getAudioData, setTheInterval]);

  if (!note) return <></>;

  return (
    <>
      <p>Name: {note.name}</p>
      <p>Cents: {note.cents}</p>
      <p>Pitch: {Math.round(note.pitch)}</p>
      <p>Frequency: {note.frequency}</p>
      <input type="range" name="note" min={-50} max={50} value={note.cents} onChange={() => {}} disabled />
    </>
  );
}

// { "pitch": 26.156583629893237, "name": "G♯", "value": 20, "cents": 13, "octave": 0, "frequency": 20 }
