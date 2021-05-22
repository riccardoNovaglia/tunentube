import { useEffect, useState } from "react";

export function Mics({ setMic }) {
  const [inputs, setInputs] = useState(undefined);

  async function mics() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const inputs = devices.filter((device) => device.kind === "audioinput");
    setInputs(inputs);
    setMic(inputs && inputs.length > 0 && inputs[0].deviceId);
  }

  useEffect(() => {
    mics();
  }, []);

  function onSelect(e) {
    setMic(e.target.value);
  }

  return (
    <>
      <label htmlFor="inputs">Inputs</label>
      {inputs && (
        <select id="inputs" onChange={onSelect}>
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
