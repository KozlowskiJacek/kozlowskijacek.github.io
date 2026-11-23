/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Obraz responsywny z vite-imagetools (`as=picture`): srcset per format + fallback <img>. */
type ResponsivePicture = {
  /** Klucz: format (avif, webp), wartość: srcset. */
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

// Presety zdefiniowane w vite.config.ts (imagePresets).
declare module "*?avatar" {
  const picture: ResponsivePicture;
  export default picture;
}
declare module "*?logo" {
  const picture: ResponsivePicture;
  export default picture;
}
declare module "*?photo" {
  const picture: ResponsivePicture;
  export default picture;
}
declare module "*?cover" {
  const picture: ResponsivePicture;
  export default picture;
}
declare module "*?pixel" {
  const picture: ResponsivePicture;
  export default picture;
}

/** Adresy CV z public/cv/ (PL / EN); null, gdy pliku nie ma (ustawiane w vite.config.ts). */
declare const __CV_FILES__: { pl: string | null; en: string | null };
