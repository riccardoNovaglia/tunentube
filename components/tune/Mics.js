import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styles from "./Tune.module.scss";

const preferredDeviceCookieName = "preferred-mic";

export function Mics({ setMic, disabled }) {
  const [devices, setDevices] = useState();
  const [selectedMic, setSelectedMic] = useState();
  const [cookies, setCookie, removeCookie] = useCookies([preferredDeviceCookieName]);
  const preferredDevice = cookies[preferredDeviceCookieName];

  useEffect(() => {
    getAudioDevices()
      .then((devices) => setDevices(devices))
      .catch(() => setDevices([]));
  }, []);

  useEffect(() => {
    if (devices === undefined) return;

    if (devices.some((device) => device.deviceId === preferredDevice)) {
      setSelectedMic(preferredDevice);
      setMic(preferredDevice);
    } else {
      removeCookie(preferredDeviceCookieName);
    }
  }, [preferredDevice, setCookie, removeCookie, devices, setMic]);

  function onMicSelection(mic) {
    setSelectedMic(mic);
    setMic(mic);
    setCookie(preferredDeviceCookieName, mic);
  }

  async function refresh() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await getAudioDevices();
      setDevices(devices);
      setMic(devices[0]);
      stream.getAudioTracks().forEach((track) => track.stop());
    } catch (e) {
      // we didn't get permissions to access mics, not much we can do unless they try again and let us
    }
  }

  return (
    <div className={styles.mics}>
      <label htmlFor="mics">Microphones</label>
      {devices && (
        <select
          id="mics"
          onChange={(e) => onMicSelection(e.target.value)}
          value={selectedMic}
          disabled={disabled}
        >
          {devices.map((input) => (
            <option key={input.label} value={input.deviceId}>
              {input.label}
            </option>
          ))}
        </select>
      )}
      <button onClick={refresh} className={styles.refreshMics}>
        Refresh
      </button>
    </div>
  );
}

async function getAudioDevices() {
  const foundDevices = await navigator.mediaDevices.enumerateDevices();
  const audioDevices = foundDevices
    .filter(
      ({ kind, deviceId, label }) =>
        kind === "audioinput" && deviceId !== "" && label !== ""
    )
    .map(({ deviceId, label }) => ({ deviceId, label }));
  return audioDevices;
}
