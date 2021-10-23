import { useState } from "react";

import styles from "./Tube.module.scss";

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
      <label htmlFor="chapters">{chaptersVisible ? "Hide Chapters" : "Show Chapters"}</label>
      <input
        id="chapters"
        type="checkbox"
        value={chaptersVisible}
        onChange={(e) => setChaptersVisible(e.target.checked)}
      />
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

function Chapter({ chapter, onChapterTrigger, selected }) {
  return (
    <li className={selected ? styles.activeChapter : styles.chapter}>
      {chapter.name}: {chapter.start}-{chapter.end}
      <button onClick={() => onChapterTrigger(chapter)}>{selected ? "Unselect" : "Select"}</button>
    </li>
  );
}

function NewChapter({ onNewChapter }) {
  function onSubmit(event) {
    event.preventDefault();
    const [{ value: start }, { value: end }, { value: name }] = event.target;
    onNewChapter({ start, end, name, id: `${start}-${end}-${name}` });
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Start
        <input type="float" id="start" />
      </label>
      <label>
        End
        <input type="float" id="end" />
      </label>
      <label>
        Name
        <input type="text" id="name" />
      </label>

      <input type="submit" value="Save" />
    </form>
  );
}

function sortByStartAndEnd(c1, c2) {
  return c1.start !== c2.start ? c1.start - c2.start : c1.end - c2.end;
}
