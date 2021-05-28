import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const cookieName = "preferred-mic";

export function Mics({ setMic }) {
  const [inputs, setInputs] = useState(undefined);
  const [selectedMic, setSelectedMic] = useState(undefined);
  const [cookies, setCookie, removeCookie] = useCookies();
  const preferredCookie = cookies[cookieName];

  const selectMic = useCallback(
    (selectedMic) => {
      setMic(selectedMic);
      setSelectedMic(selectedMic);
      setCookie(cookieName, selectedMic);
    },
    [setCookie, setMic]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const inputs = devices.filter((device) => device.kind === "audioinput");
      setInputs(inputs);
    });
  }, []);

  useEffect(() => {
    if (inputs === undefined) return;

    if (preferredCookie) {
      if (inputs.some((input) => input.deviceId === preferredCookie)) {
        selectMic(preferredCookie);
      } else {
        removeCookie(cookieName);
      }
    } else {
      selectMic(inputs && inputs.length > 0 && inputs[0].deviceId);
    }
  }, [inputs, preferredCookie, removeCookie, selectMic]);

  return (
    <>
      <label htmlFor="inputs">Inputs</label>
      {inputs && (
        <select
          id="inputs"
          onChange={(e) => selectMic(e.target.value)}
          value={selectedMic}
        >
          {inputs.map((input) => (
            <option key={input.label} value={input.deviceId}>
              {input.label}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
