import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { projectCategoryLabelKeys, type Project } from "../../data/projects";
import { caseStudyPath } from "../../data/navigation";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import YouTubeEmbed from "../ui/YouTubeEmbed";

type VideoModalProps = {
  /** Realizacja z `videoUrl`; null = modal zamknięty. */
  project: Project | null;
  onClose: () => void;
};

const TITLE_ID = "video-modal-title";

/** Odtwarzacz realizacji wideo w modalu. Iframe istnieje tylko, gdy modal jest otwarty. */
const VideoModal = ({ project, onClose }: VideoModalProps) => {
  const { t } = useTranslation();
  const open = project !== null && Boolean(project.videoUrl);

  return (
    <Modal open={open} onClose={onClose} labelledBy={TITLE_ID} size="xl">
      {open && project?.videoUrl && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 pr-10">
            <Badge tone="video" className="self-start">
              {t(projectCategoryLabelKeys[project.category])}
            </Badge>
            <h2 id={TITLE_ID} className="text-h3 text-fg">
              {project.title}
            </h2>
          </div>
          <YouTubeEmbed url={project.videoUrl} title={project.title} autoLoad />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small text-fg-secondary">{t(project.summaryKey)}</p>
            <Link
              to={caseStudyPath(project.slug)}
              className="inline-flex shrink-0 items-center gap-2 rounded-sm text-small font-semibold text-video underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {t("home:work.case_study")}
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default VideoModal;
