import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Test() {
  const [things, setThings] = useState([]);

  useEffect(() => {
    async function fetchStuff() {
      let { data, error, status } = await supabase
        .from("videos")
        .select("url, song (title)");
      console.log({ data, error, status });
      setThings(data);
    }
    fetchStuff();
  }, []);

  return (
    <div>
      {things.map((video, i) => (
        <a key={video.url} href={video.url}>
          {video.song.title}
        </a>
      ))}
      <p>hello!</p>
    </div>
  );
}
