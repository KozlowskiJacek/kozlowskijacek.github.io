import Seo from "../components/Seo";
import Contact from "../sections/Contact";

const ContactPage = () => (
  <>
    <Seo titleKey="contact.meta.title" descriptionKey="contact.meta.description" />
    <Contact asPage />
  </>
);

export default ContactPage;
