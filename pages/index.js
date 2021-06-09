import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Tune } from "../components/Tune/Tune";
import Tube from "../components/tube/Tube";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tune 'n' Tube</title>
      </Head>

      <main className={styles.main}>
        <h1>Tune 'n' Tube</h1>
        <div className={styles.tubeTune}>
          <Tube />
          <Tune />
        </div>
      </main>
    </div>
  );
}
