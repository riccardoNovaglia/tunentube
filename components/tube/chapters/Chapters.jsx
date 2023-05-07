import { supabase } from "supabase/client";
import { useUser } from "supabase/hooks";

import { Chapter as ChapterObj } from "components/tube/chapters/chapter/Chapter";
import styles from "./chapters.module.scss";

export function Chapters({
  chapters,
  onChaptersUpdate,
  activeChapter,
  onChapterTrigger,
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

  return (
    <>
      {chapters.length > 0 ? (
        <ul className={styles.chaptersList}>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <Chapter
                chapter={chapter}
                activeChapter={activeChapter}
                onChapterTrigger={onChapterTrigger}
                onDelete={user ? onDelete : undefined}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No chapters added, yet</p>
      )}
    </>
  );
}

function Chapter({ chapter: rawChapter, onChapterTrigger, onDelete, activeChapter }) {
  const chapter = ChapterObj.fromInput(rawChapter);

  return (
    <label>
      {chapter.name}: {chapter.start}-{chapter.end}
      <input
        type="checkbox"
        checked={chapter.isEqualTo(activeChapter)}
        onChange={(e) => onChapterTrigger(e.target.checked ? chapter : undefined)}
      />
      {onDelete && <button onClick={() => onDelete(chapter.id)}>Delete</button>}
    </label>
  );
}
