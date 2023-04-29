import { useEffect, useState } from "react";

import { supabase } from "../../../../lib/supabaseClient";
import { NewChapter } from "./NewChapter";
import { Chapter } from "./Chapter.jsx";
import { Chapter as ChapterObj } from "./Chapter";

import styles from "./Chapters.module.scss";

export function Chapters({
  videoId,
  activeChapter,
  onChapterTrigger,
  savedChapters = [],
}) {
  const [chapters, setChapters] = useState(savedChapters);
  const [adding, setAdding] = useState(false);

  async function onNewChapter(newChapter) {
    setAdding(false);

    const { name, start, end } = newChapter;
    const { data, error } = await supabase
      .from("chapters")
      .insert([{ name, start, end, video_id: videoId }]);

    if (!newChapter || chapters.some((chap) => chap.isEqualTo(newChapter))) return;

    setChapters([...chapters, newChapter].sort((c1, c2) => c1.minus(c2)));
  }
  function onChapterDeleted(chapter) {
    chapters.splice(chapters.indexOf(chapter), 1);
    setChapters([...chapters]);
  }

  useEffect(() => {
    async function fetchChapters() {
      const { data: chapters, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("video_id", videoId);
      if (error) {
        console.error(error);
      } else {
        const mapped = chapters.map((c) => ChapterObj.fromInput(c));
        setChapters(mapped);
      }
    }
    if (videoId) {
      fetchChapters();
    } else {
    }
  }, [videoId]);

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
              key={chapter.id}
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
