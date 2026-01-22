"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { trackProjectView } from "@/lib/analytics";

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
  t: (key: string) => string;
}

export default function MainSection({
  projects,
  locale,
  t,
}: MainSectionProps) {
  const handleProjectClick = (project: Project) => {
    trackProjectView(project.id);
  };
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-8">
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

      {/* Grid Layout - 手機版 2 列，平板 2 列，桌面 3 列 */}
      <section
        aria-label={t("project.listLabel")}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5"
      >
        {projects.map((project: Project) => (
          <motion.article
            key={project.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col"
          >
            <Link
              href={`/project/${project.slug}`}
              onClick={() => handleProjectClick(project)}
              className="cursor-pointer group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-neutral-200/70 transition hover:-translate-y-1 hover:shadow-md hover:ring-neutral-300"
            >
              <div className="relative flex-shrink-0">
                <div className="overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title[locale] || project.title["zh-TW"]}
                    width={900}
                    height={900}
                    className="aspect-square w-full object-cover transform-gpu transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col space-y-1 px-3 pb-3 pt-2.5 text-left sm:space-y-1.5 sm:px-4 sm:pb-4 sm:pt-3">
                <p className="text-[10px] font-medium tracking-[0.1em] text-[#666666] uppercase sm:text-xs">
                  {project.category[locale] || project.category["zh-TW"]}
                </p>
                <h2 className="text-sm font-semibold leading-snug sm:text-base">
                  {project.title[locale] || project.title["zh-TW"]}
                </h2>
                <p className="flex-1 text-[11px] text-[#666666] sm:text-xs">
                  {project.timeSpent[locale] || project.timeSpent["zh-TW"]}
                </p>
                {/* Color Palette */}
                <div className="flex items-center gap-1 pt-0.5 sm:gap-1.5">
                  {project.colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="h-2.5 w-2.5 rounded-full ring-1 ring-neutral-200/60 sm:h-3 sm:w-3"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
