import Link from "next/link";
import { useState } from "react";
import { supabase } from "supabase/client";
import { useUser } from "supabase/hooks";

import styles from "./videos.module.scss";

export function VideosList({ videos }) {
  const user = useUser();
  const [adding, setAdding] = useState(false);

  return (
    <div className={styles.videosList}>
      <ul>
        {videos.map((video) => {
          return (
            <li key={video.id}>
              <Link href={`videos/${video.id}`}>{video.name}</Link>
            </li>
          );
        })}
      </ul>
      {user && (
        <div>
          <button onClick={() => setAdding(true)}>Add video</button>
        </div>
      )}
      {adding === true && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const {
              name: { value: nameValue },
              url: { value: urlValue },
            } = e.target;
            const { error } = await supabase
              .from("videos")
              .insert([{ name: nameValue, url: urlValue }]);
            if (!error) location.reload();
          }}
        >
          <label>
            Name:
            <input name="name" required></input>
          </label>
          <label>
            Url:
            <input name="url" required></input>
          </label>
          <button>Save</button>
        </form>
      )}
    </div>
  );
}
