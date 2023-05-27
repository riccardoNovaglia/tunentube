import { useState } from "react";
import { Chapter } from "./Chapter";
import styles from "./chapter.module.scss";

export function NewChapter({ onNewChapter }) {
  const [error, setError] = useState();

  function onSubmit(event) {
    event.preventDefault();
    const { name, start, end } = event.target;
    const newChap = Chapter.fromForm({
      name: name.value,
      start: Number(start.value),
      end: Number(end.value),
    });
    const error = newChap.isValid();
    if (!error) {
      onNewChapter(newChap);
    } else {
      setError(error);
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.newChapter}>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        Start
        <input type="float" name="start" />
      </label>
      <label>
        End
        <input type="float" name="end" />
      </label>

      <button className={styles.save} type="submit">
        Save
      </button>
      <button className={styles.cancel} onClick={() => onNewChapter(null)}>
        Cancel
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
