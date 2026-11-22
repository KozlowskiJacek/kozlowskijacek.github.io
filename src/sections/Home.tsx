import { useEffect, useState } from "react";
import "boxicons/css/boxicons.min.css";
import homePhoto1 from "../assets/img/MainPhoto.png";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../lib/animations";
import { socials } from "../data/socials";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";

const roles = [
  "Full Stack Developer",
  "YouTuber",
  "Video Editor",
  "Content Creator",
  "Marketing Specialist",
];

const Home = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharindex] = useState(0);
  const [pause, setPause] = useState(false);

  const typingSpeed = 150;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    // Przy ograniczonym ruchu nie animujemy pisania — pokazujemy pierwszą rolę na stałe.
    if (reduceMotion) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting && charIndex < roles[index].length) {
          setText((prev) => prev + roles[index][charIndex]);
          setCharindex((prev) => prev + 1);
        } else if (!isDeleting && charIndex === roles[index].length) {
          setPause(true);
          setTimeout(() => {
            setIsDeleting(true);
            setPause(false);
          }, pauseDuration);
        } else if (isDeleting && charIndex > 0) {
          setText((prev) => prev.slice(0, -1));
          setCharindex((prev) => prev - 1);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, index, isDeleting, pause, reduceMotion]);

  return (
    <Section id="home" padding="hero" className="flex-col md:flex-row md:justify-between" backdrop={<HeroBackdrop />}>
      <motion.div
        className="w-full md:max-w-[36rem]"
        variants={staggerContainer(0.08)}
        {...reveal}
      >
        <motion.h3 variants={staggerItem} className="mb-4 text-body-lg font-medium text-fg-secondary">
          {t("home.hello")}
        </motion.h3>
        <motion.h1 variants={staggerItem} className="text-display text-fg">
          Jacek Kozłowski
        </motion.h1>
        <motion.h3 variants={staggerItem} className="mb-6 mt-4 text-h3 text-fg-secondary">
          {t("home.im")} <span className="text-accent">{reduceMotion ? roles[0] : text}</span>
          {!reduceMotion && (
            <span aria-hidden="true" className="ml-0.5 animate-blink font-light text-accent">
              |
            </span>
          )}
        </motion.h3>
        <motion.div variants={staggerItem} className="space-y-4 text-body text-fg-secondary md:text-body-lg">
          <p>{t("home.text")}</p>
          <p>{t("home.text2")}</p>
        </motion.div>
        <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-4">
          <Button size="lg" to={{ hash: "contact" }}>
            {t("home.btn_get_in_touch")}
          </Button>
          <div className="flex items-center gap-2">
            {socials
              .filter((link) => link.href)
              .map((link) => (
                <a
                  key={link.id}
                  href={link.href ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-border-strong text-xl text-fg-secondary transition-[color,border-color,background-color] duration-200 ease-out hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <i aria-hidden="true" className={`bx ${link.icon}`}></i>
                </a>
              ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="w-full max-w-sm md:max-w-md"
        variants={fadeIn("bottom", 0.15)}
        {...reveal}
      >
        <img className="h-auto w-full" src={homePhoto1} alt="" />
      </motion.div>
    </Section>
  );
};

/** Delikatna poświata i siatka punktów pod hero. */
const HeroBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute -top-48 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl" />
    <div className="absolute -right-40 bottom-0 h-[24rem] w-[32rem] rounded-full bg-video/[0.05] blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
  </div>
);

export default Home;
