import { EventEmitter } from "events";

const constraints = {
  audio: {
    mandatory: {
      googEchoCancellation: false,
      googAutoGainControl: false,
      googNoiseSuppression: false,
      googHighpassFilter: false,
    },
  },
};

async function getUserMedia() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const userMedia = await navigator.mediaDevices.getUserMedia(constraints);
      return userMedia;
    } catch (e) {
      console.error("Failed to load User Media", e);
    }
  }
  console.warn("Audio recording not supported by your web browser");
  return null;
}

const defaultConfig = {
  gainThreshold: 0.01,
  analyserFFTSize: 4096,
  audioPollInterval: 50,
};

export default class Recorder extends EventEmitter {
  constructor(ctx, config) {
    super();
    this.config = {
      ...defaultConfig,
      ...config,
    };
    this.isReady = false;
    this.audioContext =
      ctx || new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.initializeMediaStream();
  }

  initializeMediaStream = async () => {
    const userMediaStream = await getUserMedia();
    if (!userMediaStream) {
      return false;
    }
    this.audioSource =
      this.audioContext.createMediaStreamSource(userMediaStream);
    this.audioSource.connect(this.analyser);
    this.analyser.fftSize = this.config.analyserFFTSize;
    this.isReady = true;
    this.emit("ready", userMediaStream);
    return true;
  };

  handleAudioEvent = () => {
    if (this.listenerCount("data") > 0) {
      const dataArray = new Float32Array(this.analyser.frequencyBinCount);
      // Can we use the frequency data for a more accurate guess?
      // this.analyser.getFloatFrequencyData(dataArray);
      this.analyser.getFloatTimeDomainData(dataArray);
      const max = Math.max(...dataArray);
      if (max > this.config.gainThreshold) {
        this.emit("data", dataArray);
      }
    }
  };

  start() {
    if (!this.isReady) {
      console.warn("Recorder is not ready to record");
    }
    this.audioInputInterval = setInterval(
      this.handleAudioEvent,
      this.config.audioPollInterval
    );
    this.emit("start");
  }

  stop() {
    clearInterval(this.audioInputInterval);
    this.emit("stop");
  }

  teardown() {
    this.stop();
    if (this.audioSource) {
      this.audioSource.disconnect();
    }
  }
}
