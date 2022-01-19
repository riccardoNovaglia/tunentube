import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@reach/tabs";

import { Chapters } from "./chapters/Chapters";
import { Videos } from "./videos/Videos";

import styles from "./VideosAndChapters.module.scss";
import "@reach/tabs/styles.css";

export function VideosAndChapters({ setVideoToPlay, activeChapter, onChapterTrigger }) {
  return (
    <Tabs className={styles.tabs}>
      <TabList className={styles.tabsList}>
        <Tab className={styles.tab}>Chapters</Tab>
        <Tab className={styles.tab}>Videos</Tab>
      </TabList>

      <TabPanels className={styles.panels}>
        <TabPanel className={styles.panel}>
          <Chapters activeChapter={activeChapter} onChapterTrigger={onChapterTrigger} />
        </TabPanel>
        <TabPanel>
          <Videos setVideo={setVideoToPlay} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
