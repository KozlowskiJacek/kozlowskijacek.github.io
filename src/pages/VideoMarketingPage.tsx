import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import { useServiceJsonLd } from "../lib/structuredData";
import { paths } from "../data/navigation";
import ServiceHero from "../components/services/ServiceHero";
import ServiceGrid from "../components/services/ServiceGrid";
import PackageCards from "../components/services/PackageCards";
import ServiceProjects from "../components/services/ServiceProjects";
import FAQ from "../components/services/FAQ";
import ServiceCTA from "../components/services/ServiceCTA";
import YouTubeEmbed from "../components/ui/YouTubeEmbed";
import {
  videoAudience,
  videoAudienceCopy,
  videoCta,
  videoFaq,
  videoFaqCopy,
  videoHero,
  videoPackages,
  videoPackagesCopy,
  videoPortfolio,
  videoServices,
  videoServicesCopy,
  videoShowreelUrl,
  videoTone,
  videoTopic,
} from "../data/services/video";

/** /uslugi/wideo — „Kreacja wideo”. */
const VideoMarketingPage = () => {
  const { t } = useTranslation();
  const service = useServiceJsonLd({
    path: paths.servicesVideo,
    nameKey: "services:video.meta.title",
    descriptionKey: "services:video.meta.description",
    serviceType: "Video production",
    packages: videoPackages,
  });

  return (
    <>
      <Seo titleKey="services:video.meta.title" descriptionKey="services:video.meta.description" jsonLd={[service]} />
      <ServiceHero
        hero={videoHero}
        tone={videoTone}
        topic={videoTopic}
        secondaryHref="#packages"
        media={
          videoShowreelUrl ? (
            <YouTubeEmbed url={videoShowreelUrl} title={t("services:video.hero.showreel")} />
          ) : undefined
        }
      />
      <ServiceGrid id="services" bg="secondary" copy={videoServicesCopy} items={videoServices} tone={videoTone} />
      <ServiceGrid id="audience" copy={videoAudienceCopy} items={videoAudience} tone={videoTone} columns={3} />
      <PackageCards
        id="packages"
        bg="secondary"
        copy={videoPackagesCopy}
        packages={videoPackages}
        tone={videoTone}
        topic={videoTopic}
      />
      <ServiceProjects id="work" portfolio={videoPortfolio} tone={videoTone} />
      <FAQ id="faq" bg="secondary" copy={videoFaqCopy} items={videoFaq} tone={videoTone} />
      <ServiceCTA cta={videoCta} tone={videoTone} topic={videoTopic} />
    </>
  );
};

export default VideoMarketingPage;
