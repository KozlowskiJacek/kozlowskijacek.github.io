/**
 * Polityka prywatności (/polityka-prywatnosci). Treść w `privacy.*` w plikach tłumaczeń.
 * TODO: szkic — zweryfikować treść (administrator, okresy przechowywania, ustawienia EmailJS)
 * przed publikacją; po zmianach zaktualizować `privacyUpdatedAt`.
 */

/** Data ostatniej aktualizacji (ISO), formatowana zgodnie z językiem strony. */
export const privacyUpdatedAt = "2026-11-23";

export type PrivacySection = {
  id: string;
  titleKey: string;
  /** Akapity (klucze tłumaczeń); `{{email}}` zastępowany adresem kontaktowym. */
  paragraphKeys: string[];
  /** Opcjonalna lista punktowana pod akapitami. */
  listKeys?: string[];
};

const section = (id: string, paragraphs: number, list = 0): PrivacySection => ({
  id,
  titleKey: `privacy.sections.${id}.title`,
  paragraphKeys: Array.from({ length: paragraphs }, (_, i) => `privacy.sections.${id}.p${i + 1}`),
  listKeys: list ? Array.from({ length: list }, (_, i) => `privacy.sections.${id}.l${i + 1}`) : undefined,
});

export const privacySections: PrivacySection[] = [
  section("controller", 1),
  section("data", 1, 3),
  section("purpose", 1, 3),
  section("processors", 1, 3),
  section("retention", 2),
  section("rights", 1, 6),
  section("voluntary", 1),
  section("storage", 2),
];
