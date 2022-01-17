import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@reach/tabs";

import { Chapters } from "./chapters/Chapters";
import { Videos } from "./videos/Videos";

import styles from "./VideosAndChapters.module.scss";
import "@reach/tabs/styles.css";

export function VideosAndChapters({ setVideoToPlay, activeChapter, setActiveChapter }) {
  return (
    <Tabs>
      <TabList className={styles.tabs}>
        <Tab>Chapters</Tab>
        <Tab>Videos</Tab>
      </TabList>

      <TabPanels className={styles.panels}>
        <TabPanel>
          <Chapters
            activeChapter={activeChapter}
            onChapterSelected={(chapter) => setActiveChapter(chapter)}
            onChapterUnselected={() => setActiveChapter(undefined)}
          />
        </TabPanel>
        <TabPanel>
          <Videos setVideo={setVideoToPlay} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
