import styles from "./chapter.module.scss";

export function Chapter({ chapter, duration, onDelete }) {
  const pctStart = (chapter.start / duration) * 100;
  const pctEnd = 100 - (chapter.end / duration) * 100;

  return (
    <>
      <div className={chapter.isActive ? styles.activeChapter : styles.chapter}>
        <div aria-hidden="true" className={styles.backgroundBar}>
          <div
            className={styles.current}
            style={{
              marginLeft: `${pctStart}%`,
              marginRight: `${pctEnd}%`,
            }}
          />
        </div>
        <label className={styles.chapterLabel} onClick={(e) => e.preventDefault()}>
          {chapter.name}: {chapter.start}-{chapter.end}
          <input type="checkbox" className={styles.chapterBtn} />
        </label>
        {onDelete && (
          <button className={styles.deleteBtn} onClick={() => onDelete(chapter.id)}>
            Delete
          </button>
        )}
      </div>
    </>
  );
}
