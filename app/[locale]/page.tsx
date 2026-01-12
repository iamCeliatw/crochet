"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "../../data/project";
import ProjectDetailModal from "../../components/ProjectDetailModal";
import Header from "@/components/Header";
import MainSection from "@/components/MainSection";
import { trackPageView, trackProjectView } from "@/lib/analytics";

type Project = {
  id: number;
  slug: string;
  title: { [key: string]: string };
  category: { [key: string]: string };
  materials: { [key: string]: string };
  timeSpent: { [key: string]: string };
  description: { [key: string]: string };
  coverImage: string;
  images: string[];
  colorPalette: string[];
};

export default function CrochetPortfolioPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [selected, setSelected] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 追蹤頁面訪問
  useEffect(() => {
    trackPageView();
  }, []);

  const handleOpenDetail = (project: Project) => {
    setSelected(project);
    setCurrentImageIndex(0);
    // 追蹤作品點擊
    trackProjectView(project.id);
  };

  const handleCloseDetail = () => {
    setSelected(null);
  };

  const handlePrevImage = () => {
    if (!selected) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selected.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selected) return;
    setCurrentImageIndex((prev) =>
      prev === selected.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333]">
      <Header />

      <MainSection
        projects={projects}
        locale={locale}
        onProjectClick={handleOpenDetail}
        t={t}
      />

      <ProjectDetailModal
        project={selected}
        currentImageIndex={currentImageIndex}
        locale={locale}
        onClose={handleCloseDetail}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        onImageSelect={setCurrentImageIndex}
        t={t}
      />
    </div>
  );
}
