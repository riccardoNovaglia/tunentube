import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import { Chapters } from "./chapters/Chapters";
import { Videos } from "./videos/Videos";

import styles from "./VideosAndChapters.module.scss";

export function VideosAndChapters({ setVideoToPlay, activeChapter, setActiveChapter }) {
  const [tab, setTab] = useState("chapters");

  const chaptersTab = useRef();
  const videosTab = useRef();

  function onArrowsNavigation(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (document.activeElement === videosTab.current) {
        chaptersTab.current.focus();
      } else {
        videosTab.current.focus();
      }
    }
  }

  return (
    <div className={styles.things}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Chapters or Videos tabs"
        onKeyDown={onArrowsNavigation}
      >
        <button
          role="tab"
          aria-controls="chapters"
          onClick={() => setTab("chapters")}
          ref={chaptersTab}
          tabIndex={tab === "chapters" ? 0 : -1}
          aria-selected={tab === "chapters"}
          className={styles.tab}
        >
          Chapters
        </button>
        <button
          role="tab"
          aria-controls="videos"
          onClick={() => setTab("videos")}
          ref={videosTab}
          tabIndex={tab === "videos" ? 0 : -1}
          aria-selected={tab === "videos"}
          className={styles.tab}
        >
          Videos
        </button>
      </div>
      <div className={styles.tabContent}>
        <div id="chapters" role="tabpanel" hidden={tab !== "chapters"}>
          <Chapters
            activeChapter={activeChapter}
            onChapterSelected={(chapter) => setActiveChapter(chapter)}
            onChapterUnselected={() => setActiveChapter(undefined)}
          />
        </div>
        <div id="videos" role="tabpanel" hidden={tab !== "videos"}>
          <Videos setVideo={setVideoToPlay} />
        </div>
      </div>
    </div>
  );
}
