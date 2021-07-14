import { useState } from "react";
import useInterval from "@use-it/interval";
import Switch from "rc-switch";
import { useAudioAnalyser } from "./useSoundAnalyser";
import { getNote } from "../playback/noteFinder";

export function Tuner({ mic, onTuning }) {
  const [note, setNote] = useState(undefined);
  const { startRecording, stopRecording, getAudioData, recording: analysing } = useAudioAnalyser();

  useInterval(
    () => {
      const audioData = getAudioData();
      const note = getNote(audioData);
      if (note) {
        setNote(note);
      }
    },
    analysing ? 50 : null
  );

  const toggleTuning = () => {
    if (analysing) {
      stopRecording();
      onTuning(false);
    } else {
      startRecording({ deviceId: mic });
      onTuning(true);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="tune">Tune</label>
        <Switch id="tune" checked={analysing} onChange={toggleTuning} />
      </div>
      {analysing && <Note note={note} />}
    </>
  );
}

export function Note({ note }) {
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
