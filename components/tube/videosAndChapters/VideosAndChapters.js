import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import { Chapters } from "./chapters/Chapters";
import { Videos } from "./videos/Videos";

import styles from "./VideosAndChapters.module.scss";
import "react-tabs/style/react-tabs.css";

export function VideosAndChapters({
  video,
  setVideoToPlay,
  activeChapter,
  onChapterTrigger,
}) {
  return (
    <Tabs className={styles.tabs}>
      <TabList className={styles.tabsList}>
        <Tab>Videos</Tab>
        <Tab>Chapters</Tab>
      </TabList>

      <div className={styles.panels}>
        <TabPanel>
          <Videos setVideo={setVideoToPlay} />
        </TabPanel>
        <TabPanel>
          <Chapters
            videoId={video?.id}
            activeChapter={activeChapter}
            onChapterTrigger={onChapterTrigger}
          />
        </TabPanel>
      </div>
    </Tabs>
  );
}
