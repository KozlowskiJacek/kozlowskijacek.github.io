
import ImageSlider from "../../components/ImageSlider";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"

const TheyTrustedMe = () => {

  const {t} = useTranslation()

  const fadeInVariants = (direction: "top" | "bottom" | "left" | "right") => {
    return {
      hidden: {
        opacity: 0,
        y: direction === "top" ? -80 : direction === "bottom" ? 80 : 0,
        x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 2,
          opacity: { duration: 2, delay: 0.6},
          delay: 0.2,
          ease: [0.9, 0, 0.2, 1]
        }
      }
    } 
  }

  return (
    <section
      className="text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[50px] px-4"
      id="feedback"
    >
      <motion.div className=""
        variants = {fadeInVariants("top")}
        initial = "hidden"
        whileInView = "visible"
        viewport = {{ once: false}}
       >
        <h2 className="leading-10 md:text-5xl text-3xl font-semibold mb-12 text-center">
          {t("feedback.they_trust")} <span className="text-main_accent">{t("feedback.me")}</span>
        </h2>
      </motion.div>
      <motion.div
        variants = {fadeInVariants("bottom")}
        initial = "hidden"
        whileInView = "visible"
        viewport = {{ once: false}}
       >
        <ImageSlider />
      </motion.div>
    </section>
  );
};

export default TheyTrustedMe;
