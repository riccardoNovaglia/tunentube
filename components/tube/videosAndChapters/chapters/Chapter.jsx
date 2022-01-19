import styles from "./Chapter.module.scss";

export function Chapter({ chapter, onChapterTrigger, onDelete, activeChapter }) {
  return (
    <label
      className={chapter.isEqualTo(activeChapter) ? styles.activeChapter : styles.chapter}
    >
      {chapter.paragraph}
      <input
        type="checkbox"
        checked={chapter.isEqualTo(activeChapter)}
        onChange={() => onChapterTrigger(chapter)}
      />
      <button onClick={() => onDelete(chapter)}>Delete</button>
    </label>
  );
}
