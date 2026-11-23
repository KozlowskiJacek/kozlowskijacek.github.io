/** Konfiguracja EmailJS — wyłącznie z import.meta.env (plik .env, patrz README). */
const emailJsEnv = {
  VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

/** Nazwy zmiennych, których brakuje (puste lub nieustawione). */
export const missingEmailJsVars = Object.entries(emailJsEnv)
  .filter(([, value]) => !value?.trim())
  .map(([name]) => name);

export type EmailJsConfig = { serviceId: string; templateId: string; publicKey: string };

/** null, gdy brakuje którejkolwiek zmiennej — wysyłka kończy się wtedy stanem błędu (fallback mailto). */
export const emailJsConfig: EmailJsConfig | null =
  missingEmailJsVars.length === 0
    ? {
        serviceId: emailJsEnv.VITE_EMAILJS_SERVICE_ID!,
        templateId: emailJsEnv.VITE_EMAILJS_TEMPLATE_ID!,
        publicKey: emailJsEnv.VITE_EMAILJS_PUBLIC_KEY!,
      }
    : null;

/** Czytelny komunikat dla dewelopera (konsola + baner nad formularzem w trybie dev). */
export const missingEmailJsMessage =
  `Brak konfiguracji EmailJS: ${missingEmailJsVars.join(", ")}. ` +
  "Skopiuj .env.example do .env, uzupełnij wartości (README → Zmienne środowiskowe) i zrestartuj npm run dev.";

if (import.meta.env.DEV && !emailJsConfig) {
  console.error(`[EmailJS] ${missingEmailJsMessage}`);
}
