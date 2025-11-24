// app/[locale]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { projects } from "../../data/project";

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
};

export default function CrochetPortfolioPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
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

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-neutral-200/60 bg-[#FDFBF7]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tracking-[0.2em] text-[#666666] uppercase">
              {t("header.brandSubtitle")}
            </span>
            <span className="text-lg font-semibold tracking-wide">
              {t("header.brand")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative inline-flex rounded-full border border-neutral-300/70 bg-white/50 p-0.5">
              <button
                type="button"
                onClick={() => switchLocale("zh-TW")}
                className={`px-2 py-1 text-xs font-medium transition rounded-full ${
                  locale === "zh-TW"
                    ? "bg-white text-[#333333] shadow-sm"
                    : "text-[#999999] hover:text-[#666666]"
                }`}
              >
                中文
              </button>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={`px-2 py-1 text-xs font-medium transition rounded-full ${
                  locale === "en"
                    ? "bg-white text-[#333333] shadow-sm"
                    : "text-[#999999] hover:text-[#666666]"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLocale("ja")}
                className={`px-2 py-1 text-xs font-medium transition rounded-full ${
                  locale === "ja"
                    ? "bg-white text-[#333333] shadow-sm"
                    : "text-[#999999] hover:text-[#666666]"
                }`}
              >
                日本語
              </button>
            </div>

            <a
              href="https://www.instagram.com/your_instagram"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300/70 px-3 py-1 text-sm text-[#666666] transition hover:border-neutral-400 hover:bg-white/70"
            >
              <Instagram className="h-4 w-4" />
              <span className="hidden sm:inline">{t("header.instagram")}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* Intro / Subheader */}
        <section className="mb-8 space-y-2">
          <p className="text-xs font-medium tracking-[0.3em] text-[#666666] uppercase">
            {t("intro.subtitle")}
          </p>
          <h1 className="text-2xl font-semibold tracking-wide sm:text-3xl">
            {t("intro.title")}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[#666666]">
            {t("intro.description")}
          </p>
        </section>

        {/* Masonry Grid */}
        <section
          aria-label={t("project.listLabel")}
          className="columns-1 gap-5 sm:columns-2 lg:columns-3"
        >
          {projects.map((project: Project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-5 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => handleOpenDetail(project)}
                className="group block w-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-neutral-200/70 transition hover:-translate-y-1 hover:shadow-md hover:ring-neutral-300"
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title[locale] || project.title["zh-TW"]}
                      width={900}
                      height={1200}
                      className="h-auto w-full transform-gpu transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>

                <div className="space-y-1 px-4 pb-4 pt-3 text-left">
                  <p className="text-xs font-medium tracking-[0.1em] text-[#666666] uppercase">
                    {project.category[locale] || project.category["zh-TW"]}
                  </p>
                  <h2 className="text-base font-semibold leading-snug">
                    {project.title[locale] || project.title["zh-TW"]}
                  </h2>
                  <p className="text-xs text-[#666666]">
                    {project.materials[locale] || project.materials["zh-TW"]} ·{" "}
                    {project.timeSpent[locale] || project.timeSpent["zh-TW"]}
                  </p>
                </div>
              </button>
            </motion.article>
          ))}
        </section>
      </main>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 px-3 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Clickable backdrop */}
            <button
              type="button"
              aria-label={t("actions.closeDetail")}
              onClick={handleCloseDetail}
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
                onClick={handleCloseDetail}
                className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-white/80 p-1.5 text-[#666666] shadow-sm ring-1 ring-neutral-200/80 transition hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Left: Image Slider */}
              <div className="relative w-full bg-neutral-100/80 lg:w-1/2">
                {selected.images.length > 0 && (
                  <div className="relative h-full min-h-[260px] sm:min-h-[340px]">
                    <Image
                      src={selected.images[currentImageIndex]}
                      alt={`${
                        selected.title[locale] || selected.title["zh-TW"]
                      } image ${currentImageIndex + 1}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-contain p-4 sm:p-6"
                    />
                  </div>
                )}

                {/* Slider Controls */}
                {selected.images.length > 1 && (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#333333] shadow-sm ring-1 ring-neutral-200 transition hover:bg-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#333333] shadow-sm ring-1 ring-neutral-200 transition hover:bg-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/10 px-3 py-1 backdrop-blur-sm">
                      {selected.images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          aria-label={t("actions.switchToImage", {
                            index: index + 1,
                          })}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-1.5 w-4 rounded-full transition ${
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

              {/* Right: Text Info */}
              <div className="flex w-full flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:w-1/2 lg:px-8">
                <div className="space-y-2">
                  <p className="text-[11px] font-medium tracking-[0.28em] text-[#666666] uppercase">
                    {selected.category[locale] || selected.category["zh-TW"]}
                  </p>
                  <h2 className="text-xl font-semibold tracking-wide sm:text-2xl">
                    {selected.title[locale] || selected.title["zh-TW"]}
                  </h2>
                </div>

                <div className="space-y-2 border-y border-neutral-200/80 py-3 text-sm text-[#666666]">
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <span className="w-20 shrink-0 text-xs text-[#999999]">
                      {t("project.materials")}
                    </span>
                    <span className="flex-1">
                      {selected.materials[locale] ||
                        selected.materials["zh-TW"]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <span className="w-20 shrink-0 text-xs text-[#999999]">
                      {t("project.timeSpent")}
                    </span>
                    <span className="flex-1">
                      {selected.timeSpent[locale] ||
                        selected.timeSpent["zh-TW"]}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-sm">
                  <p className="text-xs font-medium tracking-[0.18em] text-[#999999] uppercase">
                    {t("project.notes")}
                  </p>
                  <p className="leading-loose text-[#333333]">
                    {selected.description[locale] ||
                      selected.description["zh-TW"]}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-[#999999]">
                  <span>{t("footer.responsive")}</span>
                  <button
                    type="button"
                    onClick={handleCloseDetail}
                    className="inline-flex items-center gap-1 rounded-full border border-neutral-200/80 px-3 py-1 text-[11px] text-[#666666] transition hover:border-neutral-400 hover:bg-white/80"
                  >
                    <span>{t("actions.close")}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
