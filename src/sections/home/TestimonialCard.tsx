import { useTranslation } from "react-i18next";
import { FaQuoteLeft } from "react-icons/fa6";
import { testimonialMeta, type Testimonial } from "../../data/testimonials";
import Card from "../../components/ui/Card";
import Img from "../../components/ui/Img";

/** Powyżej tej długości cytat jest przycinany (3 linie) i pojawia się „Czytaj więcej”. */
const LONG_QUOTE = 110;

type TestimonialCardProps = {
  testimonial: Testimonial;
  onReadMore: (testimonial: Testimonial) => void;
};

/** Logo w jasnym kaflu (białe tło pliku) albo okrągłe zdjęcie osoby. */
export const TestimonialAvatar = ({
  testimonial,
  size = "md",
}: {
  testimonial: Testimonial;
  size?: "md" | "lg";
}) => {
  const box = size === "lg" ? "h-20 w-20" : "h-14 w-14";

  if (testimonial.kind === "company") {
    return (
      <span className={`grid shrink-0 place-items-center overflow-hidden rounded-xl bg-fg ${box}`}>
        <Img
          picture={testimonial.image}
          alt=""
          sizes={size === "lg" ? "5rem" : "3.5rem"}
          className="h-full w-full scale-[1.3] object-contain mix-blend-multiply"
        />
      </span>
    );
  }

  return (
    <Img
      picture={testimonial.image}
      alt=""
      sizes={size === "lg" ? "5rem" : "3.5rem"}
      className={`shrink-0 rounded-full border border-border-strong bg-surface object-cover ${box}`}
    />
  );
};

const TestimonialCard = ({ testimonial, onReadMore }: TestimonialCardProps) => {
  const { t } = useTranslation();
  const meta = testimonialMeta(testimonial, t);
  const quote = t(testimonial.textKey);
  const isLong = quote.length > LONG_QUOTE;

  return (
    <Card as="article" className="flex h-full flex-col p-6">
      <FaQuoteLeft aria-hidden="true" className="mb-4 text-xl text-accent/60" />
      <div className="flex flex-1 flex-col items-start">
        <blockquote>
          <p className={`text-body text-fg-secondary ${isLong ? "line-clamp-3" : ""}`}>{quote}</p>
        </blockquote>
        {isLong && (
        <button
          type="button"
          onClick={() => onReadMore(testimonial)}
          className="mt-3 rounded-sm text-small font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {t("home:testimonials.read_more")}
          <span className="sr-only">: {testimonial.name}</span>
        </button>
        )}
      </div>
      <footer className="mt-6 flex items-center gap-4 border-t border-border pt-5">
        <TestimonialAvatar testimonial={testimonial} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-fg">{testimonial.name}</p>
          {meta && <p className="text-small text-fg-muted">{meta}</p>}
        </div>
      </footer>
    </Card>
  );
};

export default TestimonialCard;
