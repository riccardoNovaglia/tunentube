import Link from "next/link";

import { supabase } from "supabase/client";
import { useSession } from "supabase/hooks";
import styles from "./logInOut.module.scss";

export function LogInOut() {
  const [session, setSession] = useSession();

  return (
    <div className={styles.login}>
      {session ? (
        <a
          href="#"
          onClick={() => {
            supabase.auth.signOut();
            setSession(null);
          }}
        >
          Logout
        </a>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
