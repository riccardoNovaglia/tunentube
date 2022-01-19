import Head from "next/head";

import { Tube } from "../components/tube/Tube";
import { Tune } from "../components/tune/Tune";

import styles from "./index.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tune &apos;n&apos; Tube</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tune &apos;n&apos; Tube</h1>
        <Tube />
        <Tune />
      </main>
    </>
  );
}
