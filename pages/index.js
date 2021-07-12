import Head from "next/head";
import { useState } from "react";

import Tube from "../components/Tube/Tube";
import { Tune } from "../components/Tune/Tune";
import { Tunes } from "../components/Tunes/Tunes";

import styles from "../styles/Home.module.css";

export default function Home({ videos }) {
  const [video, setVideo] = useState(undefined);
  return (
    <div className={styles.container}>
      <Head>
        <title>Tune 'n' Tube</title>
      </Head>

      <main className={styles.main}>
        <h1>Tune 'n' Tube</h1>
        <div className={styles.tubeTune}>
          <Tube video={video} />
          <Tune />
        </div>
        <Tunes videos={videos} setVideo={setVideo} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const videos = [
    {
      url: "https://www.youtube.com/watch?v=XtRifYMxXXw",
      title: "Redbone",
    },
    {
      url: "https://www.youtube.com/watch?v=vVSn1xindPM",
      title: "Californication",
    },
    {
      url: "https://www.youtube.com/watch?v=XUTCU3v22GI",
      title: "Otherside",
    },
    {
      url: "https://www.youtube.com/watch?v=5_SUiiOJtL8",
      title: "Breathe",
    },
    {
      url: "https://www.youtube.com/watch?v=qs9KVyJnKIU",
      title: "Feeling good",
    },
  ];
  return {
    props: {
      videos,
    },
  };
}
