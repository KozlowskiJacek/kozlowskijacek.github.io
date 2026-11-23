import { useTranslation } from "react-i18next";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaPrint } from "react-icons/fa6";
import mainPhoto from "../../assets/img/main-photo.webp?photo";
import { enter } from "../../lib/animations";
import { career, availabilityLabelKeys, workModeLabelKeys, type Availability } from "../../data/career";
import { contactTopicPath } from "../../data/services/contact";
import { cvFiles, cvLanguages } from "../../data/cv";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";
import Tag from "../../components/ui/Tag";
import Img from "../../components/ui/Img";

const availabilityDot: Record<Availability, "accent" | "video" | "muted"> = {
  open: "accent",
  "freelance-only": "video",
  closed: "muted",
};

const hasCv = cvLanguages.some((lang) => cvFiles[lang]);

/** Adres bez protokołu — do wersji drukowanej. */
const bareUrl = (url: string) => url.replace(/^https?:\/\//, "");

/** Nagłówek CV: zdjęcie, imię, headline, dostępność i główne akcje. */
const EmployerHero = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="employer"
      padding="page"
      className="flex-col-reverse md:flex-row md:items-center md:justify-between print:!flex-row print:!items-center print:!gap-5 print:!px-0"
    >
      <div className="w-full md:max-w-[40rem] print:max-w-none print:flex-1">
        <p className={`mb-4 text-small font-semibold uppercase tracking-wider text-accent print:hidden ${enter(0)}`}>
          {t("common:navbar.employers")}
        </p>
        <h1 className={`font-display text-h1 text-fg print:!text-[20pt] ${enter(1)}`}>{career.name}</h1>
        <p
          className={`mt-4 text-balance text-body-lg text-fg-secondary print:mt-0.5 print:!text-[10pt] ${enter(2)}`}
        >
          {t(career.headlineKey)}
        </p>

        <div className={`mt-6 flex flex-wrap items-center gap-2 print:mt-1.5 print:gap-1 ${enter(3)}`}>
          <Tag
            dot={availabilityDot[career.availability]}
            className="font-medium text-fg print:px-1.5 print:py-0 print:!text-[8pt]"
          >
            {t(availabilityLabelKeys[career.availability])}
          </Tag>
          <ul aria-label={t("career:employer.hero.work_modes")} className="flex flex-wrap gap-2 print:gap-1">
            {career.workModes.map((mode) => (
              <li key={mode}>
                <Tag className="print:px-1.5 print:py-0 print:!text-[8pt]">{t(workModeLabelKeys[mode])}</Tag>
              </li>
            ))}
          </ul>
        </div>

        {/* Tylko na wydruku: linki zamiast przycisków. */}
        <p className="hidden print:mt-1.5 print:flex print:flex-wrap print:gap-x-3 print:!text-[8.5pt]">
          <span>LinkedIn: {bareUrl(career.links.linkedin)}</span>
          <span>GitHub: {bareUrl(career.links.github)}</span>
          <span>WWW: {bareUrl(career.links.website)}</span>
        </p>

        <div className={`mt-8 flex flex-wrap gap-3 print:hidden ${enter(4)}`}>
          {cvLanguages.map((lang) => {
            const href = cvFiles[lang];
            return (
              href && (
                <Button key={lang} href={href} download>
                  <FaDownload aria-hidden="true" />
                  {t("career:employer.hero.download_cv", { lang: lang.toUpperCase() })}
                </Button>
              )
            );
          })}
          <Button
            variant="secondary"
            href={career.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin aria-hidden="true" />
            LinkedIn
          </Button>
          <Button
            variant="secondary"
            href={career.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
            GitHub
          </Button>
          <Button to={contactTopicPath("praca")} variant={hasCv ? "secondary" : "primary"}>
            <FaEnvelope aria-hidden="true" />
            {t("career:employer.hero.contact")}
          </Button>
          <Button variant="secondary" onClick={() => window.print()}>
            <FaPrint aria-hidden="true" />
            {t("career:employer.hero.print")}
          </Button>
        </div>
      </div>

      <Img
        picture={mainPhoto}
        alt={t("career:employer.hero.photo_alt")}
        priority
        sizes="(min-width: 768px) 18rem, 12rem"
        className={`aspect-square w-48 shrink-0 rounded-full border border-border-strong bg-surface-elevated object-cover shadow-lift md:w-72 print:w-[26mm] print:border-0 ${enter(1)}`}
      />
    </Section>
  );
};

export default EmployerHero;
