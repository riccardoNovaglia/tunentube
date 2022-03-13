import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input className="inputField" type="email" name="email" />
      <input className="inputField" type="submit" value="Login" disabled={loading} />
      <span>{loading && "Loading"}</span>
    </form>
  );
}
