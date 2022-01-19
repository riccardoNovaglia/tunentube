import { useState } from "react";

import { NewChapter } from "./NewChapter";
import { Chapter } from "./Chapter.jsx";

import styles from "./Chapters.module.scss";

export function Chapters({ activeChapter, onChapterTrigger, savedChapters = [] }) {
  const [chapters, setChapters] = useState(savedChapters);
  const [adding, setAdding] = useState(false);

  function onNewChapter(newChapter) {
    setAdding(false);
    if (!newChapter || chapters.some((chap) => chap.isEqualTo(newChapter))) return;

    setChapters([...chapters, newChapter].sort((c1, c2) => c1.minus(c2)));
  }
  function onChapterDeleted(chapter) {
    chapters.splice(chapters.indexOf(chapter), 1);
    setChapters([...chapters]);
  }

  return (
    <div className={styles.chapters}>
      {chapters.length > 0 ? (
        <ul className={styles.chaptersList}>
          {chapters.map((chapter) => (
            <Chapter
              chapter={chapter}
              activeChapter={activeChapter}
              onChapterTrigger={onChapterTrigger}
              onDelete={onChapterDeleted}
              key={chapter.key}
            />
          ))}
        </ul>
      ) : (
        <p>No chapters added, yet</p>
      )}
      {adding ? (
        <NewChapter onNewChapter={onNewChapter} />
      ) : (
        <button className={styles.addChapter} onClick={() => setAdding(true)}>
          Add chapter
        </button>
      )}
    </div>
  );
}
