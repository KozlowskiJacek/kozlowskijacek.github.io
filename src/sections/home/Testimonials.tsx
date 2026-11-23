import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { testimonialMeta, testimonials, type Testimonial } from "../../data/testimonials";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import TestimonialCard, { TestimonialAvatar } from "./TestimonialCard";

/**
 * Opinie klientów: na mobile/tablecie przewijany poziomo slider (scroll-snap),
 * od `lg` siatka 3 kolumn. Pełna treść długiej opinii otwiera się w modalu.
 */
const Testimonials = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Testimonial | null>(null);

  return (
    <Section id="feedback" bg="secondary" className="flex-col">
      <motion.div className="max-w-2xl text-center" variants={fadeIn("bottom")} {...reveal}>
        <SectionHeading
          align="center"
          title={t("home.testimonials.title")}
          accent={t("home.testimonials.accent")}
        />
        <p className="mt-4 text-body text-fg-secondary md:text-body-lg">{t("home.testimonials.text")}</p>
      </motion.div>

      <motion.ul
        aria-label={t("home.testimonials.list_label")}
        className="-mx-5 flex w-[calc(100%+2.5rem)] snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:w-full lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
        variants={staggerContainer()}
        {...reveal}
      >
        {testimonials.map((testimonial) => (
          <motion.li
            key={testimonial.id}
            variants={staggerItem}
            className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto"
          >
            <TestimonialCard testimonial={testimonial} onReadMore={setSelected} />
          </motion.li>
        ))}
      </motion.ul>

      <Modal open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <figure className="flex flex-col items-center text-center">
            <TestimonialAvatar testimonial={selected} size="lg" />
            <figcaption className="mt-4">
              <p className="text-h3 text-fg">{selected.name}</p>
              <p className="text-small text-fg-muted">{testimonialMeta(selected, t)}</p>
            </figcaption>
            <blockquote className="mt-5 text-fg-secondary">
              <p>{t(selected.textKey)}</p>
            </blockquote>
            <Button variant="secondary" className="mt-6" onClick={() => setSelected(null)}>
              {t("common.close")}
            </Button>
          </figure>
        )}
      </Modal>
    </Section>
  );
};

export default Testimonials;
