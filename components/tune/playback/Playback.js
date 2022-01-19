import Switch from "rc-switch";
import { useAudio as usePlayback } from "./usePlayback";
import styles from "../Tune.module.scss";

export function Playback({ mic, onPlaying }) {
  const { startRecording, stopRecording, recording } = usePlayback();

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
      onPlaying(false);
    } else {
      startRecording({ deviceId: mic, volumeBoost: true, playback: true });
      onPlaying(true);
    }
  };

  return (
    <div className={styles.playback}>
      <label htmlFor="playback">Playback</label>
      <Switch
        id="playback"
        aria-label="Start playback"
        checked={recording}
        onChange={toggleRecording}
      />
    </div>
  );
}
