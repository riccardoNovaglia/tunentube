import Link from "next/link";
import { useSession } from "supabase/hooks";

export function VideosList({ videos }) {
  const [session, setSession] = useSession();

  return (
    <>
      <ul>
        {videos.map((video) => {
          return (
            <li key={video.id}>
              <Link href={`videos/${video.id}`}>{video.name}</Link>
            </li>
          );
        })}
      </ul>
      {session && (
        <div>
          <button>Add video</button>
        </div>
      )}
    </>
  );
}
