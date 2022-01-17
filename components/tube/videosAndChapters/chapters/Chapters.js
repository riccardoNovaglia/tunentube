import { useState } from "react";

import { NewChapter } from "./NewChapter";

import styles from "./Chapters.module.scss";

export function Chapters({ activeChapter, savedChapters = [], onChapterSelected, onChapterUnselected }) {
  const [chapters, setChapters] = useState(savedChapters);

  function onNewChapter(newChapter) {
    if (chapters.some((chap) => chap.isEqualTo(newChapter))) return;

    setChapters([...chapters, newChapter].sort((c1, c2) => c1.minus(c2)));
  }

  function onChapterTrigger(chapter) {
    if (chapter === activeChapter) {
      onChapterUnselected();
    } else {
      onChapterSelected(chapter);
    }
  }

  return (
    <>
      {chapters.length > 0 ? (
        <ul>
          {chapters.map((chapter) => (
            <li className={chapter.isEqualTo(activeChapter) ? styles.activeChapter : styles.chapter} key={chapter.key}>
              <p>{chapter.paragraph}</p>
              <button onClick={() => onChapterTrigger(chapter)}>
                {chapter.isEqualTo(activeChapter) ? "Unselect" : "Select"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chapters added, yet</p>
      )}
      <NewChapter onNewChapter={onNewChapter} />
      <button onClick={() => setChapters([])}>Clear</button>
    </>
  );
}
