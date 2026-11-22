import { useTranslation } from "react-i18next";
import PageIntro from "../components/PageIntro";
import MySkills from "../sections/MySkills";

const EmployersPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageIntro
        id="employers"
        eyebrow={t("navbar.employers")}
        title={t("pages.employers.title")}
        text={t("pages.employers.text")}
      />
      <MySkills />
    </>
  );
};

export default EmployersPage;
