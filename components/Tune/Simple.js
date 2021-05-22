import PitchFinder from "pitchfinder";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mics } from "./Mics";
import { getNote } from "./Tuner";

const defaultConfig = {
  gainThreshold: 0.01,
  analyserFFTSize: 4096,
  audioPollInterval: 50,
};

function getAudioStream(stream) {
  const audioCtx = new AudioContext();

  const source = audioCtx.createMediaStreamSource(stream);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;

  return { source, audioCtx, analyser };
}

function startRecording(source, analyser) {
  source.connect(analyser);
}
function startPlaying(analyser, audioCtx) {
  analyser.connect(audioCtx.destination);
}

export function Simple() {
  const [analyser, setAnalyser] = useState();
  const [streamTracks, setStreamTracks] = useState();

  const [mic, setMic] = useState(undefined);
  const [recording, setRecording] = useState(false);

  async function startRecord() {
    console.log({ mic });
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: mic },
    });
    const { source, audioCtx, analyser } = getAudioStream(stream);
    setStreamTracks(stream.getTracks());
    setAnalyser(analyser);
    startRecording(source, analyser);
    startPlaying(analyser, audioCtx);
    setRecording(true);
  }

  const memocall = useCallback(() => {
    something();
  }, [something]);

  useEffect(() => {
    recording &&
      setInterval(() => {
        memocall();
      }, defaultConfig.audioPollInterval);
  }, [recording, memocall, defaultConfig.audioPollInterval]);

  function something() {
    const dataArray = new Float32Array(analyser.frequencyBinCount);
    // Can we use the frequency data for a more accurate guess?
    // this.analyser.getFloatFrequencyData(dataArray);
    analyser.getFloatTimeDomainData(dataArray);
    const max = Math.max(...dataArray);
    console.log(max);
    if (max > defaultConfig.gainThreshold) {
      const note = getNote(dataArray);
      console.log(note);
    }
  }

  function stopRecording() {
    analyser.disconnect();
    streamTracks.forEach((track) => track.stop());
  }

  return (
    <>
      <p>Tuning?</p>
      <button onClick={() => startRecord()}>start?</button>
      <button onClick={() => stopRecording()}>stop?</button>
      <button
        onClick={() => {
          console.log(analyser);
          console.log(streamTracks);
          console.log(mic);
        }}
      >
        check
      </button>
      <Mics setMic={setMic} />
    </>
  );
}
