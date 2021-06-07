import { useCallback, useState } from "react";

const analyserFFTSize = 4096;

const blankAudioComponents = {
  audioCtx: undefined,
  analyserNode: undefined,
  gainNode: undefined,
  streamTracks: [],
};

function getAudio(stream, volumeGain) {
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = analyserFFTSize;
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = volumeGain;
  return { audioCtx, source, gainNode, analyserNode };
}

function connectAudio(nodes) {
  const filtered = nodes.filter((elem) => elem !== undefined);
  const pairs = filtered.map((node, index) => [node, filtered[index + 1]]);
  pairs.forEach(([node1, node2]) => {
    if (node2 === undefined) return;

    node1.connect(node2);
  });
}

function disconnectAudio({ audioCtx, analyserNode, gainNode, streamTracks }) {
  analyserNode.disconnect();
  gainNode.disconnect();
  streamTracks.forEach((track) => track.stop());
  audioCtx.close();
}

export function useAudio() {
  const [audioComponents, setAudioComponents] = useState(blankAudioComponents);

  const [recording, setRecording] = useState(false);

  async function startRecording({ deviceId, volumeBoost = false, playback = true }) {
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
    const { audioCtx, source, gainNode, analyserNode } = getAudio(stream, volumeBoost ? 2 : 1);
    connectAudio([source, analyserNode, playback ? audioCtx.destination : undefined]);

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
