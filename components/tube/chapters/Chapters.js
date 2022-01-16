import { useState } from "react";

import { NewChapter } from "./NewChapter";

import styles from "./Chapters.module.scss";

export function Chapters({ savedChapters = [], onChapterSelected, onChapterUnselected }) {
  const [chaptersVisible, setChaptersVisible] = useState(false);
  const [chapters, setChapters] = useState(savedChapters);
  const [activeChapter, setActiveChapter] = useState();

  function onNewChapter(newChapter) {
    if (chapters.some((chap) => chap.isEqualTo(newChapter))) return;

    setChapters([...chapters, newChapter].sort((c1, c2) => c1.minus(c2)));
  }

  return (
    <div>
      <ShowAndHideChapters chaptersVisible={chaptersVisible} setChaptersVisible={setChaptersVisible} />
      {chaptersVisible && (
        <>
          <NewChapter onNewChapter={onNewChapter} />
          <ChaptersList
            chapters={chapters}
            activeChapter={activeChapter}
            onSelection={(chapter) => {
              setActiveChapter(chapter);
              onChapterSelected(chapter);
            }}
            onUnselection={() => {
              setActiveChapter(undefined);
              onChapterUnselected();
            }}
          />
          <button onClick={() => setChapters([])}>Clear</button>
        </>
      )}
    </div>
  );
}

function ChaptersList({ chapters, activeChapter, onSelection, onUnselection }) {
  function onChapterTrigger(chapter) {
    if (chapter === activeChapter) {
      onUnselection();
    } else {
      onSelection(chapter);
    }
  }

  return (
    <ul>
      {chapters.map((chapter) => {
        return (
          <Chapter
            key={chapter.key}
            chapter={chapter}
            selected={activeChapter?.key === chapter.key}
            onChapterTrigger={onChapterTrigger}
          />
        );
      })}
    </ul>
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
      <p>
        {chapter.name}: {chapter.start}-{chapter.end}
      </p>
      <button onClick={() => onChapterTrigger(chapter)}>{selected ? "Unselect" : "Select"}</button>
    </li>
  );
}
