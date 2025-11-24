// app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ChevronLeft, ChevronRight, X } from "lucide-react";
import { projects } from "../data/project";
type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  materials: string;
  timeSpent: string;
  description: string;
  coverImage: string;
  images: string[];
};

export default function CrochetPortfolioPage() {
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
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-neutral-200/60 bg-[#FDFBF7]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tracking-[0.2em] text-[#666666] uppercase">
              Crochet
            </span>
            <span className="text-lg font-semibold tracking-wide">
              小小鉤針日常
            </span>
          </div>

          <a
            href="https://www.instagram.com/your_instagram"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300/70 px-3 py-1 text-sm text-[#666666] transition hover:border-neutral-400 hover:bg-white/70"
          >
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* Intro / Subheader */}
        <section className="mb-8 space-y-2">
          <p className="text-xs font-medium tracking-[0.3em] text-[#666666] uppercase">
            Crochet Portfolio
          </p>
          <h1 className="text-2xl font-semibold tracking-wide sm:text-3xl">
            手作鉤針
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[#666666]">
            翻動線材的瞬間，日常也能被柔軟包圍。
          </p>
        </section>

        {/* Masonry Grid */}
        <section
          aria-label="作品列表"
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
                      alt={project.title}
                      width={900}
                      height={1200}
                      className="h-auto w-full transform-gpu transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>

                <div className="space-y-1 px-4 pb-4 pt-3 text-left">
                  <p className="text-xs font-medium tracking-[0.25em] text-[#666666] uppercase">
                    {project.category}
                  </p>
                  <h2 className="text-base font-semibold leading-snug">
                    {project.title}
                  </h2>
                  <p className="text-xs text-[#666666]">
                    {project.materials} · {project.timeSpent}
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
              aria-label="關閉詳情"
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
                      alt={`${selected.title} image ${currentImageIndex + 1}`}
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
                          aria-label={`切換到第 ${index + 1} 張圖片`}
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
                    {selected.category}
                  </p>
                  <h2 className="text-xl font-semibold tracking-wide sm:text-2xl">
                    {selected.title}
                  </h2>
                </div>

                <div className="space-y-2 border-y border-neutral-200/80 py-3 text-sm text-[#666666]">
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <span className="w-20 shrink-0 text-xs text-[#999999]">
                      線材
                    </span>
                    <span className="flex-1">{selected.materials}</span>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <span className="w-20 shrink-0 text-xs text-[#999999]">
                      製作時間
                    </span>
                    <span className="flex-1">{selected.timeSpent}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-sm">
                  <p className="text-xs font-medium tracking-[0.18em] text-[#999999] uppercase">
                    創作心得
                  </p>
                  <p className="leading-loose text-[#333333]">
                    {selected.description}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-[#999999]">
                  <span>以 RWD 兩欄式呈現 · 適用桌機與手機瀏覽</span>
                  <button
                    type="button"
                    onClick={handleCloseDetail}
                    className="inline-flex items-center gap-1 rounded-full border border-neutral-200/80 px-3 py-1 text-[11px] text-[#666666] transition hover:border-neutral-400 hover:bg-white/80"
                  >
                    <span>關閉</span>
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
