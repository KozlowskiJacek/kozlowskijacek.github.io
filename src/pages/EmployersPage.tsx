import EmployerHero from "../sections/employer/EmployerHero";
import Summary from "../sections/employer/Summary";
import StackGroups from "../sections/employer/StackGroups";
import ExperienceTimeline from "../sections/employer/ExperienceTimeline";
import TechnicalProjects from "../sections/employer/TechnicalProjects";
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
  <>
    <EmployerHero />
    <Summary />
    <StackGroups />
    <ExperienceTimeline />
    <TechnicalProjects />
    <Education />
    <WhyMe />
    <ServiceCTA cta={employerCta} tone="accent" topic="praca" buttonKey="employer.cta.button" />
  </>
);

export default EmployersPage;
