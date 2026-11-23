/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Adresy CV z public/cv/ (PL / EN); null, gdy pliku nie ma (ustawiane w vite.config.ts). */
declare const __CV_FILES__: { pl: string | null; en: string | null };
