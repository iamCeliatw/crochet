"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

interface MainSectionProps {
  projects: Project[];
  locale: string;
  onProjectClick: (project: Project) => void;
  t: (key: string) => string;
}

export default function MainSection({
  projects,
  locale,
  onProjectClick,
  t,
}: MainSectionProps) {
  return (
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
              onClick={() => onProjectClick(project)}
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

              <div className="space-y-1.5 px-4 pb-4 pt-3 text-left">
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
                {/* Color Palette */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  {project.colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="h-3 w-3 rounded-full ring-1 ring-neutral-200/60"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </button>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
