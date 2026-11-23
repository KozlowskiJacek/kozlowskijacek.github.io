import Seo from "../components/Seo";
import { usePersonJsonLd } from "../lib/structuredData";
import Hero from "../sections/home/Hero";
import TrustBar from "../sections/home/TrustBar";
import ServicesOverview from "../sections/home/ServicesOverview";
import FeaturedWork from "../sections/home/FeaturedWork";
import Process from "../sections/home/Process";
import Testimonials from "../sections/home/Testimonials";
import RecruiterTeaser from "../sections/home/RecruiterTeaser";
import FinalCta from "../sections/home/FinalCta";

const MainPage = () => {
  const person = usePersonJsonLd();

  return (
    <>
      <Seo titleKey="home.meta.title" descriptionKey="home.meta.description" bareTitle jsonLd={[person]} />
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <RecruiterTeaser />
      <FinalCta />
    </>
  );
};

export default MainPage;
