/** Formularz wysłany szybciej niż ten czas od załadowania jest odrzucany (typowe zachowanie botów). */
export const MIN_FILL_TIME_MS = 3000;

/** Nazwa ukrytego pola-pułapki. Ludzie go nie widzą, boty wypełniają wszystko, co ma `name`. */
export const HONEYPOT_FIELD = "website";

export type SpamVerdict = "ok" | "honeypot" | "too_fast";

export const checkSpam = (honeypot: string, loadedAt: number, now = Date.now()): SpamVerdict => {
  if (honeypot.trim() !== "") return "honeypot";
  if (now - loadedAt < MIN_FILL_TIME_MS) return "too_fast";
  return "ok";
};
