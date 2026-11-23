import Seo from "../components/Seo";
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
  titleKey: "employer.cta.title",
  accentKey: "employer.cta.accent",
  textKey: "employer.cta.text",
};

/** CV online dla rekruterów i pracodawców (/dla-pracodawcow). */
const EmployersPage = () => (
  <div data-print-cv>
    <Seo titleKey="employer.meta.title" descriptionKey="employer.meta.description" type="profile" />
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
      <ServiceCTA cta={employerCta} tone="accent" topic="praca" buttonKey="employer.cta.button" />
    </div>
  </div>
);

export default EmployersPage;
