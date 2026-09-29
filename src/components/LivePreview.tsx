import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

// Sites are rendered at a desktop viewport, then scaled down to the card width.
const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 800;

export default function LivePreview({
  url,
  title,
  embed,
}: {
  url: string;
  title: string;
  embed: boolean;
}) {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const host = new URL(url).host.replace(/^www\./, "");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const resize = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / VIEWPORT_WIDTH),
    );
    resize.observe(el);

    // Only mount the iframe once the card is near the viewport.
    const intersect = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          intersect.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    intersect.observe(el);

    return () => {
      resize.disconnect();
      intersect.disconnect();
    };
  }, []);

  // Some sites hold their load event on slow third-party scripts, so reveal
  // the iframe after a grace period even if onLoad hasn't fired.
  useEffect(() => {
    if (!inView || !embed) return;
    const timeout = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(timeout);
  }, [inView, embed]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${title} live site`}
      className={`block border-b ${isDark ? "border-white/10" : "border-black/10"}`}
    >
      {/* Browser chrome */}
      <div
        className={`flex items-center gap-2 px-3 py-2 ${
          isDark ? "bg-zinc-900/80" : "bg-zinc-100"
        }`}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div
          className={`flex-1 truncate text-center text-[11px] font-mono px-3 py-0.5 rounded-md ${
            isDark ? "bg-white/5 text-zinc-400" : "bg-white text-zinc-500"
          }`}
        >
          {host}
        </div>
        <ArrowUpRight
          size={13}
          className={isDark ? "text-zinc-500" : "text-zinc-400"}
        />
      </div>

      <div
        ref={containerRef}
        className={`relative aspect-16/10 overflow-hidden ${
          isDark ? "bg-zinc-900" : "bg-zinc-50"
        }`}
      >
        {embed && inView && scale > 0 ? (
          <>
            {!loaded && (
              <div
                className={`absolute inset-0 animate-pulse ${
                  isDark ? "bg-white/5" : "bg-black/5"
                }`}
              />
            )}
            <iframe
              src={url}
              title={`${title} live preview`}
              tabIndex={-1}
              aria-hidden="true"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setLoaded(true)}
              className={`absolute top-0 left-0 origin-top-left pointer-events-none border-0 transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: VIEWPORT_WIDTH,
                height: VIEWPORT_HEIGHT,
                transform: `scale(${scale})`,
              }}
            />
          </>
        ) : (
          !embed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-orange-500/15 via-transparent to-amber-500/10">
              <Globe
                size={28}
                className={isDark ? "text-orange-400/70" : "text-orange-600/70"}
              />
              <span
                className={`text-2xl font-bold tracking-tight ${
                  isDark ? "text-white/80" : "text-zinc-800"
                }`}
              >
                {title}
              </span>
              <span
                className={`text-xs font-mono ${isDark ? "text-zinc-500" : "text-zinc-500"}`}
              >
                Visit {host}
              </span>
            </div>
          )
        )}
      </div>
    </a>
  );
}
