import Head from "next/head";
import { supabase } from "supabase/client";

import { VideosList } from "components/videosList/videosList";

import styles from "./index.module.scss";
import * as layoutStyles from "components/layout.module.scss";

export default function Home({ videos }) {
  return (
    <>
      <Head>
        <title>Tune &apos;n&apos; Tube</title>
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Tune &apos;n&apos; Tube</h1>
      </header>

      <main className={layoutStyles.mainContent}>
        <VideosList videos={videos} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { data: videos, error } = await supabase.from("videos").select("*");

  if (error || videos.length === 0) {
    return {
      props: { videos: [] },
    };
  }

  return { props: { videos: videos } };
}
