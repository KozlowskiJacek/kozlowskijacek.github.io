import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaStar } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "framer-motion";
import { testimonials, type Testimonial } from "../data/testimonials";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Modal from "./ui/Modal";

const STARS = 5;
const PREVIEW_LENGTH = 200;

const Stars = () => (
  <div className="flex items-center gap-1 text-rating" aria-label={`${STARS}/${STARS}`}>
    {Array.from({ length: STARS }, (_, star) => (
      <FaStar key={star} aria-hidden="true" className="h-4 w-4" />
    ))}
  </div>
);

const TestimonialsSlider = () => {
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={24}
        slidesPerView={1.15}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        onSlideChange={(cur) => setActive(cur.realIndex)}
        loop={true}
        centeredSlides={true}
        speed={reduceMotion ? 0 : 600}
        autoplay={reduceMotion ? false : { delay: 5000, pauseOnMouseEnter: true }}
        modules={[Autoplay]}
        className="!overflow-visible"
      >
        {testimonials.map((testimonial, i) => {
          const text = t(testimonial.textKey);
          const isActive = active === null ? i === 0 : active === i;

          return (
            <SwiperSlide key={testimonial.id} className="!h-auto py-2">
              <Card
                as="button"
                interactive
                onClick={() => setSelected(testimonial)}
                className={`flex h-full min-h-[15rem] w-full flex-col p-6 text-left transition-opacity duration-500 ${
                  isActive ? "border-accent/30 opacity-100" : "opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.logo}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-full border border-border-strong bg-surface object-cover"
                  />
                  <div>
                    <h3 className="text-body-lg font-semibold text-fg">{testimonial.name}</h3>
                    <Stars />
                  </div>
                </div>
                <p className="mt-5 line-clamp-6 text-small text-fg-secondary">
                  {text.length > PREVIEW_LENGTH ? text.slice(0, PREVIEW_LENGTH) + "..." : text}
                </p>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Modal open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="flex flex-col items-center text-center">
            <img
              src={selected.logo}
              alt={selected.name}
              className="mb-4 h-20 w-20 rounded-full border border-border-strong object-cover"
            />
            <h2 className="text-h3 text-fg">{selected.name}</h2>
            <div className="mt-2">
              <Stars />
            </div>
            <p className="mt-5 text-fg-secondary">{t(selected.textKey)}</p>
            <Button variant="secondary" className="mt-6" onClick={() => setSelected(null)}>
              {t("skills.close_btn")}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TestimonialsSlider;
