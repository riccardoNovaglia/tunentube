import { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { isSafari } from "react-device-detect";

import { Mics } from "./Mics";
import { Tuner } from "./tuner/Tuner";
import styles from "./Tune.module.scss";
import { Playback } from "./playback/Playback";

export function Tune() {
  const [mic, setMic] = useState(undefined);
  const [{ playing, tuning }, setMicInUse] = useState({ playing: false, tuning: false });
  const onPlaying = (playing) => setMicInUse((prev) => ({ ...prev, playing }));
  const onTuning = (tuning) => setMicInUse((prev) => ({ ...prev, tuning }));

  return (
    <CookiesProvider>
      <div className={styles.tune}>
        <Mics setMic={setMic} disabled={playing || tuning} />
        <Playback mic={mic} onPlaying={onPlaying} />
        <Tuner mic={mic} onTuning={onTuning} />
        {isSafari && (
          <>
            <p>Sorry but there seems to be a lot of delay on Safari!</p>
            <p>Brave/Chrome work best</p>
          </>
        )}
      </div>
    </CookiesProvider>
  );
}
