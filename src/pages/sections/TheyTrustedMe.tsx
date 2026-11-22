
import ImageSlider from "../../components/ImageSlider";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"
import { fadeIn, reveal } from "../../lib/animations";

const TheyTrustedMe = () => {

  const {t} = useTranslation()

  return (
    <section
      className="text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[50px] px-4"
      id="feedback"
    >
      <motion.div className=""
        variants={fadeIn("top")}
        {...reveal}
       >
        <h2 className="leading-10 md:text-5xl text-3xl font-semibold mb-12 text-center">
          {t("feedback.they_trust")} <span className="text-main_accent">{t("feedback.me")}</span>
        </h2>
      </motion.div>
      <motion.div
        variants={fadeIn("bottom")}
        {...reveal}
       >
        <ImageSlider />
      </motion.div>
    </section>
  );
};

export default TheyTrustedMe;
