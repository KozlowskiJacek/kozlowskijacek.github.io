import { useReducedMotion } from "framer-motion";
import Img from "../../components/ui/Img";

type HeroMediaProps = {
  /** Zdjęcie — widoczne zawsze, gdy nie ma wideo; dla wideo służy jako poster. */
  image: ResponsivePicture;
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
        poster={image.img.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  // Element LCP strony głównej — bez lazy loadingu, z fetchpriority="high".
  return <Img picture={image} alt="" priority sizes="(min-width: 768px) 28rem, 24rem" className="h-auto w-full" />;
};

export default HeroMedia;
