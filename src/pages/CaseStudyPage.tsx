import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa6";
import { findProject } from "../data/projects";
import { paths } from "../data/navigation";
import PageIntro from "../components/PageIntro";
import Button from "../components/ui/Button";
import NotFoundPage from "./NotFoundPage";

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = findProject(slug);

  if (!project) return <NotFoundPage />;

  return (
    <PageIntro
      id="case-study"
      eyebrow={t("pages.case_study.eyebrow")}
      title={project.title}
      text={t(project.summaryKey)}
    >
      <Button to={paths.portfolio} variant="secondary" size="lg">
        <FaArrowLeft aria-hidden="true" />
        {t("pages.case_study.back")}
      </Button>
    </PageIntro>
  );
};

export default CaseStudyPage;
