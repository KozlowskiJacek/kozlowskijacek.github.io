import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlay } from "react-icons/fa6";
import { parseYouTubeId } from "../../lib/youtube";

type YouTubeEmbedProps = {
  /** Pełny adres filmu na YouTube. */
  url: string;
  /** Tytuł filmu — etykieta przycisku i `title` iframe. */
  title: string;
  className?: string;
};

/**
 * Lekki embed YouTube: najpierw sama miniatura (jeden obrazek), odtwarzacz
 * (youtube-nocookie.com) ładuje się dopiero po kliknięciu. Niepoprawny URL → nic.
 */
const YouTubeEmbed = ({ url, title, className = "" }: YouTubeEmbedProps) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const id = parseYouTubeId(url);

  if (!id) return null;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-lift ${className}`}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-background/30 transition-colors group-hover:bg-background/10" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-video text-xl text-background shadow-lift transition-transform duration-200 motion-safe:group-hover:scale-110"
          >
            <FaPlay className="translate-x-0.5" />
          </span>
          <span className="sr-only">{t("services.play_video", { title })}</span>
        </button>
      )}
    </div>
  );
};

export default YouTubeEmbed;
