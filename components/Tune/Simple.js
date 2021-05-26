import { useCallback, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { useGetAudio } from "./audio";
import { Mics } from "./Mics";
import { getNote } from "./Tuner";

export function Simple() {
  const [mic, setMic] = useState(undefined);
  const [note, setNote] = useState(undefined);

  const onAudio = useCallback(function onAudio(audioData) {
    const note = getNote(audioData);
    if (note) {
      setNote(note);
    }
  }, []);

  const { startRecording, stopRecording, gainNode } = useGetAudio(onAudio);

  return (
    <>
      <Mics setMic={setMic} />
      <button onClick={() => startRecording(mic)}>start?</button>
      <button onClick={() => stopRecording()}>stop?</button>
      <p>MicID: {mic}</p>
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
        value={gainNode ? gainNode.gain.value : 0}
        onChange={(event) => {
          gainNode ? (gainNode.gain.value = event.target.value) : null;
        }}
      />
      <ReactSpeedometer
        fluidWidth={true}
        minValue={100}
        maxValue={500}
        value={473}
        needleColor="steelblue"
      />
    </>
  );
}
