import { useCallback, useState } from "react";
import { useAudio } from "./useAudio";
import { Mics } from "./Mics";
import { getNote } from "./noteFinder";

export function Simple() {
  const [mic, setMic] = useState(undefined);
  const [note, setNote] = useState(undefined);

  const onAudio = useCallback(function onAudio(audioData) {
    const note = getNote(audioData);
    if (note) {
      setNote(note);
    }
  }, []);

  const {
    startRecording,
    stopRecording,
    volumeGain: { volumeGain, setVolumeGain },
  } = useAudio(onAudio);

  return (
    <>
      <Mics setMic={setMic} />
      <button onClick={() => startRecording(mic)}>Start</button>
      <button onClick={() => stopRecording()}>Stop</button>
      {note && <p>{JSON.stringify(note, null, 2)}</p>}
      <p>Name: {note && note.name}</p>
      <input
        type="range"
        name="note"
        min={-50}
        max={50}
        value={note ? note.cents : 0}
        onChange={() => {}}
        disabled
      />
      <input
        type="range"
        name="gain"
        min={0}
        max={5}
        value={volumeGain}
        onChange={(event) => setVolumeGain(event.target.value)}
      />
    </>
  );
}
