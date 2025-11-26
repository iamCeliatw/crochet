"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import OrderModal from "./OrderModal";

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

interface ProjectDetailModalProps {
  project: Project | null;
  currentImageIndex: number;
  locale: string;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onImageSelect: (index: number) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}

export default function ProjectDetailModal({
  project,
  currentImageIndex,
  locale,
  onClose,
  onPrevImage,
  onNextImage,
  onImageSelect,
  t,
}: ProjectDetailModalProps) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={project.id}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 px-3 py-6 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Clickable backdrop */}
        <button
          type="button"
          aria-label={t("actions.closeDetail")}
          onClick={onClose}
          className="absolute inset-0 h-full w-full cursor-default"
        />

        <motion.div
          className="relative z-50 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[#FDFBF7] shadow-2xl lg:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-white/80 p-1.5 text-[#666666] shadow-sm ring-1 ring-neutral-200/80 transition hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Left: Image Slider */}
          <div className="relative w-full bg-neutral-100/80 lg:w-1/2">
            {project.images.length > 0 && (
              <div className="relative h-full min-h-[260px] sm:min-h-[340px]">
                <Image
                  src={project.images[currentImageIndex]}
                  alt={`${
                    project.title[locale] || project.title["zh-TW"]
                  } image ${currentImageIndex + 1}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-4 sm:p-6"
                />
              </div>
            )}

            {/* Slider Controls */}
            {project.images.length > 1 && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="button"
                    onClick={onPrevImage}
                    className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#333333] shadow-sm ring-1 ring-neutral-200 transition hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <button
                    type="button"
                    onClick={onNextImage}
                    className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#333333] shadow-sm ring-1 ring-neutral-200 transition hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/10 px-3 py-1 backdrop-blur-sm">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={t("actions.switchToImage", {
                        index: index + 1,
                      })}
                      onClick={() => onImageSelect(index)}
                      className={`h-1.5 w-4 rounded-full transition ${
                        currentImageIndex === index ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Text Info */}
          <div className="flex w-full flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:w-1/2 lg:px-8">
            <div className="space-y-2">
              <p className="text-[11px] font-medium tracking-[0.28em] text-[#666666] uppercase">
                {project.category[locale] || project.category["zh-TW"]}
              </p>
              <h2 className="text-xl font-semibold tracking-wide sm:text-2xl">
                {project.title[locale] || project.title["zh-TW"]}
              </h2>
            </div>

            <div className="space-y-2 border-y border-neutral-200/80 py-3 text-sm text-[#666666]">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-20 shrink-0 text-xs text-[#999999]">
                  {t("project.materials")}
                </span>
                <span className="flex-1">
                  {project.materials[locale] || project.materials["zh-TW"]}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-20 shrink-0 text-xs text-[#999999]">
                  {t("project.timeSpent")}
                </span>
                <span className="flex-1">
                  {project.timeSpent[locale] || project.timeSpent["zh-TW"]}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-20 shrink-0 text-xs text-[#999999]">
                  {t("project.colorPalette")}
                </span>
                <div className="flex flex-1 items-center gap-2">
                  {project.colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="h-5 w-5 rounded-full shadow-sm ring-1 ring-neutral-200/60 transition hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2 text-sm">
              <p className="text-xs font-medium tracking-[0.18em] text-[#999999] uppercase">
                {t("project.notes")}
              </p>
              <p className="leading-loose text-[#333333]">
                {project.description[locale] || project.description["zh-TW"]}
              </p>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(true)}
                className="cursor-pointer inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#333333] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#444444]"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>{t("actions.order")}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1 rounded-lg border border-neutral-200/80 px-3 py-2 text-[11px] text-[#666666] transition hover:border-neutral-400 hover:bg-white/80"
              >
                <span>{t("actions.close")}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Order Modal */}
        <OrderModal
          projectTitle={project.title[locale] || project.title["zh-TW"]}
          projectId={project.id}
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          t={t}
        />
      </motion.div>
    </AnimatePresence>
  );
}
