import { useEffect, useState } from "react";
import { supabase } from "./client";

export function useUser() {
  const [user, setUser] = useState();
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);
  return user;
}

export function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return [session, setSession];
}
