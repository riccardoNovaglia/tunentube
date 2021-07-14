import { useCallback, useState } from "react";

const analyserFFTSize = 4096;

const blankAudioComponents = {
  audioCtx: undefined,
  analyserNode: undefined,
  gainNode: undefined,
  streamTracks: [],
};

function getAudio(stream) {
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = analyserFFTSize;
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 2;
  return { audioCtx, source, gainNode, analyserNode };
}

function connectAudio(source, gain, analyser) {
  source.connect(gain);
  gain.connect(analyser);
}

function disconnectAudio({ audioCtx, analyserNode, gainNode, streamTracks }) {
  analyserNode.disconnect();
  gainNode.disconnect();
  streamTracks.forEach((track) => track.stop());
  audioCtx.close();
}

export function useAudioAnalyser() {
  const [audioComponents, setAudioComponents] = useState(blankAudioComponents);

  const [recording, setRecording] = useState(false);

  async function startRecording({ deviceId }) {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId,
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        mozNoiseSuppression: false,
        mozAutoGainControl: false,
        autoGainControl: false,
      },
    });
    const { audioCtx, source, gainNode, analyserNode } = getAudio(stream);
    connectAudio(source, gainNode, analyserNode);

    setAudioComponents({
      audioCtx,
      analyserNode,
      gainNode,
      streamTracks: stream.getTracks(),
    });

    setRecording(true);
  }

  function stopRecording() {
    disconnectAudio(audioComponents);
    setAudioComponents(blankAudioComponents);
    setRecording(false);
  }

  const getAudioData = useCallback(
    function getAudioData() {
      if (recording) {
        const analyserNode = audioComponents.analyserNode;
        const dataArray = new Float32Array(analyserNode.frequencyBinCount);
        analyserNode.getFloatTimeDomainData(dataArray);
        return dataArray;
      }
    },
    [audioComponents.analyserNode, recording]
  );

  return {
    startRecording,
    stopRecording,
    getAudioData,
    recording,
  };
}
