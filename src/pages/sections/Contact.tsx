import FormContact from "../../components/FormContact";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

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
          opacity: { duration: 2, delay: 0.6 },
          delay: 0.2,
          ease: [0.9, 0, 0.2, 1],
        },
      },
    };
  };

  return (
    <section
      className="text-white bg-bg_color_2 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
      id="contact"
    >
      <motion.div
        variants={fadeInVariants("top")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <h2 className="mb-5 md:text-5xl text-3xl font-semibold">
          {t("contact.lets")}{" "}
          <span className="text-main_accent">{t("contact.collaborate")}</span>{" "}
          🤝
        </h2>
        <p className="md:text-base text-sm text-gray_400 mb-[3rem]">
          {t("contact.write")}
        </p>
      </motion.div>

      <motion.div
        variants={fadeInVariants("bottom")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <FormContact />
      </motion.div>
    </section>
  );
};

export default Contact;
