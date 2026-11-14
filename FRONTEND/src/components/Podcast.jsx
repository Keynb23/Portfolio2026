import { useState } from "react";
import { ArrowUpRight, Moon, Play, Youtube } from "lucide-react";
import { show } from "../content";
import Reveal from "./Reveal";

export function SpotifyIcon({ size = 18, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.9 15 10.56 18.72 12.84c.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
    </svg>
  );
}

// Equalizer bars that idle quietly and come alive while something plays.
function Waveform({ playing }) {
  const bars = [0.5, 0.9, 0.65, 1, 0.75, 0.45, 0.85, 0.6, 0.95, 0.55, 0.8, 0.4];
  return (
    <div className={`eq flex h-8 items-end gap-1 ${playing ? "is-playing" : ""}`} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="eq-bar w-1 rounded-full bg-sage"
          style={{ "--h": h, animationDelay: `${i * -0.13}s` }}
        />
      ))}
    </div>
  );
}

// Shows a thumbnail until clicked, then swaps in the real player.
// Keeps YouTube's heavy iframe off the page until someone actually wants it.
function VideoPlayer({ episode, playing, onPlay }) {
  const [thumb, setThumb] = useState("maxresdefault");

  if (playing) {
    return (
      <iframe
        key={episode.youtubeId}
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?autoplay=1&rel=0`}
        title={`${show.name}, Ep. ${episode.number}: ${episode.title}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      className="group absolute inset-0 cursor-pointer"
      aria-label={`Play Ep. ${episode.number}: ${episode.title}`}
    >
      <img
        key={episode.youtubeId}
        src={`https://i.ytimg.com/vi/${episode.youtubeId}/${thumb}.jpg`}
        onError={() => setThumb("hqdefault")}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
      />
      <span className="absolute inset-0 bg-linear-to-t from-ink/60 to-transparent" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-ink">
          <span className="absolute inset-0 animate-ping rounded-full ring-1 ring-sage/40 [animation-duration:2.5s]" />
          <Play size={28} className="translate-x-0.5" fill="currentColor" />
        </span>
      </span>
      <span className="absolute right-4 bottom-4 rounded-full bg-ink/60 px-3 py-1 text-xs text-neutral-300 backdrop-blur md:right-6 md:bottom-6">
        Ep. {episode.number} · ~4 hours
      </span>
    </button>
  );
}

export default function Podcast() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const episode = show.episodes[active];

  const choose = (i) => {
    setActive(i);
    setPlaying(true);
  };

  const pill =
    "inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-colors";

  return (
    <section id="podcast" className="night relative overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="stars pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-144 w-xl rounded-full bg-sage/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-16 max-w-3xl md:mb-20">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-sage">
            <Moon size={15} /> After hours
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">{show.name}.</h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-400 md:text-xl">{show.description}</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-900 ring-1 ring-white/10">
              <VideoPlayer episode={episode} playing={playing} onPlay={() => setPlaying(true)} />
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-neutral-400">Episodes</h3>
              <Waveform playing={playing} />
            </div>

            <ol className="divide-y divide-white/10 border-y border-white/10">
              {show.episodes.map((ep, i) => {
                const isActive = i === active;
                return (
                  <li key={ep.youtubeId}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex w-full cursor-pointer items-center gap-4 py-5 text-left"
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors ${
                          isActive ? "bg-sage text-ink" : "bg-white/5 text-neutral-400 group-hover:bg-white/10"
                        }`}
                      >
                        {isActive && playing ? <Play size={14} fill="currentColor" /> : String(ep.number).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block font-semibold tracking-tight transition-colors ${
                            isActive ? "text-white" : "text-neutral-300 group-hover:text-white"
                          }`}
                        >
                          {ep.title}
                        </span>
                        <span className="block text-sm text-neutral-500">{ep.topic}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Spotify's own player: a play button streams a preview right on the page. */}
            <iframe
              src={show.spotifyEmbed}
              title={`${show.name} on Spotify`}
              className="h-38 w-full rounded-xl"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />

            <div className="flex flex-wrap gap-3">
              <a
                href={show.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pill} hover:border-[#1db954] hover:bg-[#1db954] hover:text-ink`}
              >
                <SpotifyIcon size={16} /> Follow on Spotify
              </a>
              <a
                href={show.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pill} hover:border-white hover:bg-white hover:text-ink`}
              >
                <Youtube size={16} /> Subscribe <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
