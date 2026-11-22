import aboutPhoto from '../assets/img/Photo_about.png'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeIn, reveal } from "../lib/animations";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const About = () => {

  const { t } = useTranslation()

  return (
    <Section id="about" bg="secondary" className="md:flex-row flex-col-reverse">
      <motion.div className='w-[75vw] m-10'
        variants={fadeIn("bottom")}
        {...reveal}
      >
       <img src={aboutPhoto} alt="" className='max-w-[100%] max-h-[100%] animate-floatImage'/>
      </motion.div>
      <motion.div className='text-white w-full'
        variants={fadeIn("right")}
        {...reveal}
      >
        <SectionHeading
          className='text-left md:text-5xl text-3xl font-semibold mb-2'
          variants={fadeIn("top")}
          {...reveal}
          title={t("about.about")}
          accent={t("about.me")}
        />
        <h3 className='md:text-3xl text-xl font-bold mb-4'>{t("about.title")}</h3>
        <p className='md:leading-7 md:text-base text-sm my-5 md:mb-5 mb-1'>{t("about.text")} 
          <Button variant="ghost" to="/about"> {t("about.see_more")}</Button>
        </p>
      </motion.div>

    </Section>
  )
}

export default About