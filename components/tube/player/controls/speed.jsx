import { useEffect, useState } from "react";

import styles from "../Player.module.scss";

function usePrecision() {
  const [precise, setPrecise] = useState(false);
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Meta") setPrecise(true);
    }
    function handleKeyup(e) {
      if (e.key === "Meta") setPrecise(false);
    }

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, []);
  return { precise };
}
function useKeyboardControls({ faster, slower }) {
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === ">") faster();
      if (e.key === "<") slower();
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [faster, slower]);
}

export function Speed({ speed, onSpeedChange }) {
  const { precise } = usePrecision();
  const step = precise ? 0.05 : 0.15;
  useKeyboardControls({
    faster: () => onSpeedChange(speed + step < 1 ? speed + step : 1),
    slower: () => onSpeedChange(speed - step > 0.25 ? speed - step : 0.25),
  });
  return (
    <div className={styles.speed}>
      <input
        type="range"
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        min={0.25}
        max={1}
        step={step}
        value={speed}
      />
      <p>{speed.toPrecision(2)}</p>
      <div className={styles.speedButtons}>
        <button onClick={() => onSpeedChange(0.25)}>0.25</button>
        <button onClick={() => onSpeedChange(0.5)}>0.50</button>
        <button onClick={() => onSpeedChange(0.75)}>0.75</button>
      </div>
    </div>
  );
}
