"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "../../data/project";
import ProjectDetailModal from "../../components/ProjectDetailModal";
import Header from "@/components/Header";
import MainSection from "@/components/MainSection";

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

  const handleOpenDetail = (project: Project) => {
    setSelected(project);
    setCurrentImageIndex(0);
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
