import { useState } from "react";
import { supabase } from "supabase/client";
import { useUser } from "supabase/hooks";

import { Chapter } from "./chapter/Chapter.jsx";
import { NewChapter } from "./chapter/NewChapter.jsx";
import { Chapter as ChapterObj } from "components/tube/chapters/chapter/Chapter.js";

import styles from "./chapters.module.scss";

export function Chapters({
  chapters,
  onChaptersUpdate,
  activeChapter,
  onChapterTrigger,
  duration,
  videoId,
}) {
  const user = useUser();
  const [adding, setAdding] = useState(false);

  async function onDelete(chapterId) {
    const { error: deleteError } = await supabase
      .from("chapters")
      .delete()
      .eq("id", chapterId);
    if (deleteError) console.error(deleteError);
    onChaptersUpdate();
  }
  async function saveChapter({ name, start, end }) {
    const { error } = await supabase
      .from("chapters")
      .insert([{ name, start, end, video_id: videoId }]);

    if (error) console.error(deleteError);
    setAdding(false);
    onChaptersUpdate();
  }

  const chaps = chapters
    .map((chapter) => ChapterObj.fromData(chapter, activeChapter))
    .sort((c1, c2) => c1.minus(c2))
    .map((chapter) => (
      <li
        key={chapter.id}
        className={styles.chapterListItem}
        onClick={() => onChapterTrigger(chapter)}
      >
        <Chapter
          chapter={chapter}
          duration={duration}
          onChapterTrigger={onChapterTrigger}
          onDelete={user ? onDelete : undefined}
        />
      </li>
    ));

  return (
    <>
      {chapters.length > 0 ? (
        <ul className={styles.chaptersList}>{chaps}</ul>
      ) : (
        <p>No chapters added, yet</p>
      )}
      {user && <button onClick={() => setAdding(true)}>New chapter</button>}
      {adding ? (
        <NewChapter
          onNewChapter={(chapter) => (chapter ? saveChapter(chapter) : setAdding(false))}
        />
      ) : null}
    </>
  );
}
