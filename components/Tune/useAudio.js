import { useCallback, useEffect, useState } from "react";

const analyserFFTSize = 4096;
const audioPollInterval = 50;

function getAudio(stream) {
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = analyserFFTSize;
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 2;
  return { audioCtx, source, gainNode, analyserNode };
}

function connectAudio(source, gainNode, analyserNode, destination) {
  source.connect(gainNode);
  gainNode.connect(analyserNode);
  analyserNode.connect(destination);
}

export function useAudio(onAudio) {
  const [analyserNode, setAnalyserNode] = useState();
  const [gainNode, setGainNode] = useState();
  const [streamTracks, setStreamTracks] = useState();

  const [recording, setRecording] = useState(false);
  const [interval, setTheInterval] = useState(undefined);

  async function startRecording(deviceId) {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId },
    });
    const { audioCtx, source, gainNode, analyserNode } = getAudio(stream);
    setStreamTracks(stream.getTracks());
    setAnalyserNode(analyserNode);
    setGainNode(gainNode);

    connectAudio(source, gainNode, analyserNode, audioCtx.destination);

    const interval = setInterval(() => {
      const dataArray = new Float32Array(analyserNode.frequencyBinCount);
      analyserNode.getFloatTimeDomainData(dataArray);
      onAudio(dataArray);
    }, audioPollInterval);
    setTheInterval(interval);
  }

  const stopRecording = useCallback(() => {
    console.log("stopping recording!");
    analyserNode.disconnect();
    gainNode.disconnect();
    streamTracks.forEach((track) => track.stop());
    setRecording(false);
    window.clearInterval(interval);
    setTheInterval(undefined);
  }, [analyserNode, gainNode, interval, streamTracks]);

  useEffect(() => {
    return () => {
      if (interval) {
        stopRecording();
      }
    };
  }, [interval, stopRecording]);

  return {
    startRecording,
    stopRecording,
    recording,
    volumeGain: {
      volumeGain: gainNode ? gainNode.gain.value : 0,
      setVolumeGain: (value) => (gainNode ? (gainNode.gain.value = value) : {}),
    },
  };
}
