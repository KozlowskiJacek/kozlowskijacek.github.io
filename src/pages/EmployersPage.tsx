import Seo from "../components/Seo";
import { usePersonJsonLd } from "../lib/structuredData";
import EmployerHero from "../sections/employer/EmployerHero";
import Summary from "../sections/employer/Summary";
import StackGroups from "../sections/employer/StackGroups";
import ExperienceTimeline from "../sections/employer/ExperienceTimeline";
import TechnicalProjects from "../sections/employer/TechnicalProjects";
import Certificates from "../sections/employer/Certificates";
import Education from "../sections/employer/Education";
import WhyMe from "../sections/employer/WhyMe";
import ServiceCTA from "../components/services/ServiceCTA";

const employerCta = {
  titleKey: "career:employer.cta.title",
  accentKey: "career:employer.cta.accent",
  textKey: "career:employer.cta.text",
};

/** Profil zawodowy i CV online (/doswiadczenie). */
const EmployersPage = () => {
  const person = usePersonJsonLd();

  return (
    <div data-print-cv>
      <Seo
        titleKey="career:employer.meta.title"
        descriptionKey="career:employer.meta.description"
        type="profile"
        jsonLd={[person]}
      />
      <EmployerHero />
      <Summary />
      <StackGroups />
      <ExperienceTimeline />
      <TechnicalProjects />
      <Certificates />
      <Education />
      {/* Na wydruku zostaje samo CV — bez sekcji perswazyjnych. */}
      <div className="print:hidden">
        <WhyMe />
        <ServiceCTA cta={employerCta} tone="accent" topic="praca" buttonKey="career:employer.cta.button" />
      </div>
    </div>
  );
};

export default EmployersPage;
