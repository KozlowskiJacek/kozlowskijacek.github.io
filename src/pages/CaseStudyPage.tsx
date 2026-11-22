import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";
import { projects } from "../data/projects";
import { paths } from "../data/navigation";
import PageIntro from "../components/PageIntro";
import Button from "../components/ui/Button";

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <Navigate to={paths.portfolio} replace />;

  return (
    <PageIntro
      id="case-study"
      eyebrow={t("pages.case_study.eyebrow")}
      title={project.title}
      text={t(project.descriptionKey)}
    >
      <Button to={paths.portfolio} variant="secondary" size="lg">
        <FaArrowLeft aria-hidden="true" />
        {t("pages.case_study.back")}
      </Button>
    </PageIntro>
  );
};

export default CaseStudyPage;
