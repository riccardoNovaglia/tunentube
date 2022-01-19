import { useState } from "react";

const blankAudioComponents = {
  audioCtx: undefined,
  streamTracks: [],
};

function getAudio(stream) {
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  return { audioCtx, source };
}

function disconnectAudio({ audioCtx, streamTracks }) {
  streamTracks.forEach((track) => track.stop());
  audioCtx.close();
}

export function useAudio() {
  const [audioComponents, setAudioComponents] = useState(blankAudioComponents);

  const [recording, setRecording] = useState(false);

  async function startRecording({ deviceId }) {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId,
        latency: 0,
        echoCancellation: false,
        noiseSuppression: false,
        mozNoiseSuppression: false,
        autoGainControl: false,
        mozAutoGainControl: false,
      },
    });
    const { audioCtx, source } = getAudio(stream);
    source.connect(audioCtx.destination);

    setAudioComponents({
      audioCtx,
      streamTracks: stream.getTracks(),
    });

    setRecording(true);
  }

  function stopRecording() {
    disconnectAudio(audioComponents);
    setAudioComponents(blankAudioComponents);
    setRecording(false);
  }

  return {
    startRecording,
    stopRecording,
    recording,
  };
}
