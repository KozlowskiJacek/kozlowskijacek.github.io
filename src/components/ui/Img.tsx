import type { ImgHTMLAttributes } from "react";

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height" | "alt"> & {
  /** Obraz z presetem vite-imagetools, np. `import photo from "…/photo.webp?photo"`. */
  picture: ResponsivePicture;
  /** Wymagany — pusty ("") dla obrazów dekoracyjnych. */
  alt: string;
  /** Szerokość wyświetlania dla wyboru wariantu ze srcset, np. "(min-width: 768px) 28rem, 100vw". */
  sizes?: string;
  /**
   * Obraz nad zgięciem (LCP): ładowanie od razu i fetchpriority="high".
   * Domyślnie loading="lazy".
   */
  priority?: boolean;
  /** Klasy dla <picture> (domyślnie `contents` — layout jak samego <img>). */
  pictureClassName?: string;
};

const mimeTypes: Record<string, string> = {
  avif: "image/avif",
  webp: "image/webp",
};

/**
 * Responsywny obraz: <picture> z AVIF/WebP w kilku szerokościach, wymiary (bez przesunięć layoutu),
 * lazy loading i asynchroniczne dekodowanie.
 */
const Img = ({ picture, alt, sizes = "100vw", priority = false, pictureClassName = "contents", ...props }: ImgProps) => {
  // React 18 nie zna propa fetchPriority — atrybut z małej litery trafia do DOM bez ostrzeżenia.
  const fetchPriority = priority ? ({ fetchpriority: "high" } as Record<string, string>) : {};

  return (
    <picture className={pictureClassName}>
      {Object.entries(picture.sources).map(([format, srcSet]) => (
        <source key={format} type={mimeTypes[format] ?? `image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...fetchPriority}
        {...props}
      />
    </picture>
  );
};

export default Img;
