import { useState } from "react";
import { Chapter } from "./Chapter";
import styles from "./Chapter.module.scss";

export function NewChapter({ onNewChapter }) {
  const [chapter, setChapter] = useState({});
  const [error, setError] = useState();

  function onSubmit(event) {
    event.preventDefault();
    const newChap = Chapter.fromInput(chapter);
    const error = newChap.isValid();
    if (!error) {
      onNewChapter(newChap);
      setChapter({});
    } else {
      setError(error);
    }
  }

  function update(e) {
    setChapter({
      ...chapter,
      [e.target.name]: e.target.value,
    });
    setError();
  }

  return (
    <form onSubmit={onSubmit} className={styles.newChapter}>
      <label>
        Name
        <input type="text" name="name" value={chapter?.name || ""} onChange={update} />
      </label>
      <label>
        Start
        <input type="float" name="start" value={chapter?.start || ""} onChange={update} />
      </label>
      <label>
        End
        <input type="float" name="end" value={chapter?.end || ""} onChange={update} />
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
