"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import OrderModal from "./OrderModal";
import { generateImageAlt } from "@/lib/seo";

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

interface ProjectDetailPageProps {
  project: Project;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1E1510]">
      {/* Back Button — top padding clears the fixed header (~56px) */}
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#666666] transition hover:text-[#333333]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t("actions.back") || "返回"}</span>
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="flex-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100/80">
              {project.images.length > 0 && (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={project.images[currentImageIndex]}
                    alt={generateImageAlt(project, currentImageIndex, locale)}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-4 sm:p-6"
                    priority={currentImageIndex === 0}
                  />
                </motion.div>
              )}

              {/* Slider Controls */}
              {project.images.length > 1 && (
                <>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#333333] shadow-lg ring-1 ring-neutral-200 transition hover:bg-white"
                      aria-label={t("actions.previousImage") || "上一張"}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#333333] shadow-lg ring-1 ring-neutral-200 transition hover:bg-white"
                      aria-label={t("actions.nextImage") || "下一張"}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-sm">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={t("actions.switchToImage", {
                          index: index + 1,
                        })}
                        className={`h-2 w-2 rounded-full transition ${
                          currentImageIndex === index
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {project.images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                      currentImageIndex === index
                        ? "ring-[#333333]"
                        : "ring-transparent hover:ring-neutral-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={generateImageAlt(project, index, locale)}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Text Info */}
          <div className="flex w-full flex-col gap-6 lg:w-96">
            <div className="space-y-3">
              <p className="text-[11px] font-medium tracking-[0.28em] text-[#666666] uppercase">
                {project.category[locale] || project.category["zh-TW"]}
              </p>
              <h1 className="text-2xl font-semibold tracking-wide sm:text-3xl">
                {project.title[locale] || project.title["zh-TW"]}
              </h1>
            </div>

            <div className="space-y-3 border-y border-neutral-200/80 py-4 text-sm text-[#666666]">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-24 shrink-0 text-xs font-medium text-[#999999]">
                  {t("project.materials")}
                </span>
                <span className="flex-1">
                  {project.materials[locale] || project.materials["zh-TW"]}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-24 shrink-0 text-xs font-medium text-[#999999]">
                  {t("project.timeSpent")}
                </span>
                <span className="flex-1">
                  {project.timeSpent[locale] || project.timeSpent["zh-TW"]}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-24 shrink-0 text-xs font-medium text-[#999999]">
                  {t("project.colorPalette")}
                </span>
                <div className="flex flex-1 items-center gap-2">
                  {project.colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="h-6 w-6 rounded-full shadow-sm ring-1 ring-neutral-200/60 transition hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3 text-sm">
              <p className="text-xs font-medium tracking-[0.18em] text-[#999999] uppercase">
                {t("project.notes")}
              </p>
              <p className="leading-loose text-[#333333]">
                {project.description[locale] || project.description["zh-TW"]}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(true)}
                className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#333333] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#444444]"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{t("actions.order")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        projectTitle={project.title[locale] || project.title["zh-TW"]}
        projectId={project.id}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        t={t}
      />
    </div>
  );
}

