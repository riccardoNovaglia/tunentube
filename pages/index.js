import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { supabase } from "../lib/supabaseClient";

import { Tube } from "../components/tube/Tube";
import { Tune } from "../components/tune/Tune";

import styles from "./index.module.scss";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Tune &apos;n&apos; Tube</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tune &apos;n&apos; Tube</h1>
          <div className={styles.login}>
            {session ? (
              <a href="#" onClick={() => supabase.auth.signOut()}>
                Logout
              </a>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
        <Tube />
        <Tune />
      </main>
    </>
  );
}
