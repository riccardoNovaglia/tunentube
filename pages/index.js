import Head from "next/head";

import Tube from "../components/Tube/Tube";
import { Tune } from "../components/Tune/Tune";

import styles from "./index.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tune 'n' Tube</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tune 'n' Tube</h1>
        <Tube />
        <Tune />
      </main>
    </>
  );
}
