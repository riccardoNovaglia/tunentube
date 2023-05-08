import { supabase } from "supabase/client";
import { useUser } from "supabase/hooks";

import { Chapter } from "./chapter/Chapter.jsx";
import { Chapter as ChapterObj } from "components/tube/chapters/chapter/Chapter.js";

import styles from "./chapters.module.scss";

export function Chapters({
  chapters,
  onChaptersUpdate,
  activeChapter,
  onChapterTrigger,
  duration,
}) {
  const user = useUser();

  async function onDelete(chapterId) {
    const { error: deleteError } = await supabase
      .from("chapters")
      .delete()
      .eq("id", chapterId);
    if (deleteError) console.error(deleteError);
    onChaptersUpdate();
  }

  if (chapters.length === 0) return <p>No chapters added, yet</p>;

  const chaps = chapters
    .map((chapter) => ChapterObj.fromInput(chapter, activeChapter))
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

  return <ul className={styles.chaptersList}>{chaps}</ul>;
}
