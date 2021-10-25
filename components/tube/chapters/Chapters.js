import { useState } from "react";

import { NewChapter } from "./NewChapter";

import styles from "./Chapters.module.scss";

export function Chapters({ savedChapters = [], onChapterSelected, onChapterUnselected }) {
  const [chaptersVisible, setChaptersVisible] = useState(false);
  const [chapters, setChapters] = useState(savedChapters);
  const [activeChapter, setActiveChapter] = useState();

  function onNewChapter(newChapter) {
    function chapterWithSameStartAndEnd(chapter) {
      return chapter.start === newChapter.start && chapter.end === newChapter.end;
    }
    if (chapters.some(chapterWithSameStartAndEnd)) return;

    setChapters([...chapters, newChapter].sort(sortByStartAndEnd));
  }

  function onChapterTrigger(chapter) {
    if (chapter === activeChapter) {
      setActiveChapter(undefined);
      onChapterUnselected();
    } else {
      setActiveChapter(chapter);
      onChapterSelected(chapter);
    }
  }

  return (
    <div>
      <ShowAndHideChapters chaptersVisible={chapters} setChaptersVisible={setChaptersVisible} />
      {chaptersVisible && (
        <>
          <NewChapter onNewChapter={onNewChapter} />
          <ul>
            {chapters.map((chapter) => (
              <Chapter
                key={chapter.id}
                chapter={chapter}
                selected={activeChapter?.id === chapter.id}
                onChapterTrigger={onChapterTrigger}
              />
            ))}
          </ul>
          <button onClick={() => setChapters([])}>Clear</button>
        </>
      )}
    </div>
  );
}

function ShowAndHideChapters({ chaptersVisible, setChaptersVisible }) {
  return (
    <>
      <label htmlFor="chapters">{chaptersVisible ? "Hide Chapters" : "Show Chapters"}</label>
      <input
        id="chapters"
        type="checkbox"
        value={chaptersVisible}
        onChange={(e) => setChaptersVisible(e.target.checked)}
      />
    </>
  );
}

function Chapter({ chapter, onChapterTrigger, selected }) {
  return (
    <li className={selected ? styles.activeChapter : styles.chapter}>
      {chapter.name}: {chapter.start}-{chapter.end}
      <button onClick={() => onChapterTrigger(chapter)}>{selected ? "Unselect" : "Select"}</button>
    </li>
  );
}

function sortByStartAndEnd(c1, c2) {
  return c1.start !== c2.start ? c1.start - c2.start : c1.end - c2.end;
}
