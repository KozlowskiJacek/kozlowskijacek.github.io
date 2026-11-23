import Seo from "../components/Seo";
import { useServiceJsonLd } from "../lib/structuredData";
import { paths } from "../data/navigation";
import ServiceHero from "../components/services/ServiceHero";
import ServiceGrid from "../components/services/ServiceGrid";
import ProcessSteps from "../components/services/ProcessSteps";
import TechBadges from "../components/services/TechBadges";
import PackageCards from "../components/services/PackageCards";
import ServiceProjects from "../components/services/ServiceProjects";
import FAQ from "../components/services/FAQ";
import ServiceCTA from "../components/services/ServiceCTA";
import {
  webBenefits,
  webBenefitsCopy,
  webCta,
  webFaq,
  webFaqCopy,
  webHero,
  webPackages,
  webPackagesCopy,
  webPortfolio,
  webProcess,
  webProcessCopy,
  webServices,
  webServicesCopy,
  webTech,
  webTechCopy,
  webTone,
  webTopic,
} from "../data/services/web";

/** /uslugi/web — „Strony i aplikacje”. */
const WebAppsPage = () => {
  const service = useServiceJsonLd({
    path: paths.servicesWeb,
    nameKey: "web_app.meta.title",
    descriptionKey: "web_app.meta.description",
    serviceType: "Web development",
    packages: webPackages,
  });

  return (
    <>
      <Seo
        titleKey="web_app.meta.title"
        descriptionKey="web_app.meta.description"
        jsonLd={[service]}
      />
      <ServiceHero hero={webHero} tone={webTone} topic={webTopic} secondaryHref="#packages" />
      <ServiceGrid
        id="services"
        bg="secondary"
        copy={webServicesCopy}
        items={webServices}
        tone={webTone}
      />
      <ProcessSteps id="process" copy={webProcessCopy} steps={webProcess} tone={webTone} />
      <TechBadges id="tech" bg="secondary" copy={webTechCopy} groups={webTech} tone={webTone} />
      <PackageCards
        id="packages"
        copy={webPackagesCopy}
        packages={webPackages}
        tone={webTone}
        topic={webTopic}
      />
      <ServiceGrid
        id="benefits"
        bg="secondary"
        copy={webBenefitsCopy}
        items={webBenefits}
        tone={webTone}
        columns={4}
      />
      <ServiceProjects id="work" portfolio={webPortfolio} tone={webTone} />
      <FAQ id="faq" bg="secondary" copy={webFaqCopy} items={webFaq} tone={webTone} />
      <ServiceCTA cta={webCta} tone={webTone} topic={webTopic} />
    </>
  );
};

export default WebAppsPage;
