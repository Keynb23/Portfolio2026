import { Youtube } from "lucide-react";
import { profile, show } from "../content";
import { SpotifyIcon } from "./Podcast";

export default function Footer() {
  const icon = "text-neutral-500 transition-colors hover:text-sage";

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4">
          <a href={show.spotify} target="_blank" rel="noopener noreferrer" className={icon} aria-label="Podcast on Spotify">
            <SpotifyIcon size={16} />
          </a>
          <a href={show.youtube} target="_blank" rel="noopener noreferrer" className={icon} aria-label="Podcast on YouTube">
            <Youtube size={18} />
          </a>
          <span className="h-3 w-px bg-white/15" aria-hidden="true" />
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
