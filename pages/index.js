import Head from "next/head";
import styles from "../styles/Home.module.css";
// import Tune from "../components/Tune/Tune";
// import Tube from "../components/Tube";
import { Simple } from "../components/Tune/Simple";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tune 'n' Tube</title>
      </Head>

      <main className={styles.main}>
        <h1>Tune 'n' Tube</h1>
        <Simple />
        {/* <Tube /> */}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
