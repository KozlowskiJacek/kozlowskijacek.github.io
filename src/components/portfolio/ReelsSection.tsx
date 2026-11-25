import { useTranslation } from "react-i18next";
import { FaArrowUpRightFromSquare, FaInstagram, FaPlay } from "react-icons/fa6";
import { reelSummaryKey, reelTitleKey, reels } from "../../data/reels";
import { socials } from "../../data/socials";
import SectionHeading from "../ui/SectionHeading";
import Img from "../ui/Img";

const instagramProfile = socials.find((social) => social.id === "instagram")?.href ?? null;

/** Rolki z Instagrama: pionowe miniatury, kliknięcie otwiera rolkę na IG (bez embedu Mety). */
const ReelsSection = () => {
  const { t } = useTranslation();

  if (reels.length === 0) return null;

  return (
    <section aria-labelledby="reels-heading" className="flex w-full flex-col items-center gap-8 pt-8">
      <header className="flex max-w-2xl flex-col items-center gap-3 text-center">
        <p className="text-small font-semibold uppercase tracking-wider text-video">{t("portfolio:reels.eyebrow")}</p>
        <SectionHeading
          id="reels-heading"
          align="center"
          tone="video"
          title={t("portfolio:reels.title")}
          accent={t("portfolio:reels.accent")}
        />
        <p className="text-body text-fg-secondary">{t("portfolio:reels.text")}</p>
      </header>

      <ul className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {reels.map((reel) => {
          const title = t(reelTitleKey(reel));
          return (
            <li key={reel.id} className="flex flex-col gap-3">
              <a
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-video/40 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-video focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-1"
              >
                <Img
                  picture={reel.cover}
                  alt=""
                  sizes="(min-width: 768px) 17rem, 45vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent"
                />
                <FaInstagram aria-hidden="true" className="absolute right-3 top-3 text-xl text-fg drop-shadow" />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-video text-background shadow-lift transition-transform duration-200 motion-safe:group-hover:scale-110"
                >
                  <FaPlay className="translate-x-0.5" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-3 text-small font-semibold text-fg sm:p-4 sm:text-body">
                  {title}
                </span>
                <span className="sr-only">
                  {t("portfolio:reels.watch")} {t("portfolio:case_study.new_tab")}
                </span>
              </a>
              <p className="text-small text-fg-secondary">{t(reelSummaryKey(reel))}</p>
            </li>
          );
        })}
      </ul>

      {instagramProfile && (
        <a
          href={instagramProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg text-small font-semibold text-video hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-video"
        >
          <FaInstagram aria-hidden="true" />
          {t("portfolio:reels.profile")}
          <FaArrowUpRightFromSquare aria-hidden="true" className="text-xs" />
          <span className="sr-only">{t("portfolio:case_study.new_tab")}</span>
        </a>
      )}
    </section>
  );
};

export default ReelsSection;
