import { useReducedMotion } from "framer-motion";

type HeroMediaProps = {
  /** Zdjęcie — widoczne zawsze, gdy nie ma wideo; dla wideo służy jako poster. */
  image: string;
  /** Opcjonalna pętla showreela. Bez niej (lub przy ograniczonym ruchu) renderujemy zdjęcie. */
  videoSrc?: string | null;
};

/** Prawa kolumna hero: zdjęcie albo wyciszona pętla wideo. */
const HeroMedia = ({ image, videoSrc }: HeroMediaProps) => {
  const reduceMotion = useReducedMotion();

  if (videoSrc && !reduceMotion) {
    return (
      <video
        className="aspect-[4/5] w-full rounded-2xl border border-border object-cover shadow-lift"
        src={videoSrc}
        poster={image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  return <img className="h-auto w-full" src={image} alt="" />;
};

export default HeroMedia;
