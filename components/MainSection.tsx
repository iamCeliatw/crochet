"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "@/i18n/routing";
import { trackProjectView } from "@/lib/analytics";
import { useState, useEffect } from "react";

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

interface ProjectCardProps {
  project: Project;
  locale: string;
  t: (key: string) => string;
  isLatest: boolean;
  index: number;
}

function ProjectCard({
  project,
  locale,
  t,
  isLatest,
  index,
}: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: number[] = JSON.parse(
      localStorage.getItem("crochet_favorites") || "[]"
    );
    setIsFavorite(favorites.includes(project.id));
  }, [project.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites: number[] = JSON.parse(
      localStorage.getItem("crochet_favorites") || "[]"
    );
    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== project.id)
      : [...favorites, project.id];
    localStorage.setItem("crochet_favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.article
      className="break-inside-avoid mb-4 relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#E4D0B4]/60 transition-shadow hover:shadow-md hover:ring-[#C4A480]/50"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* New badge */}
      {isLatest && (
        <motion.div
          className="absolute left-2 top-2 z-10 rounded-full bg-[#A87048] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 18,
            delay: index * 0.08 + 0.3,
          }}
        >
          {t("project.newBadge")}
        </motion.div>
      )}

      {/* Heart favorite button */}
      <button
        onClick={toggleFavorite}
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-[#E4D0B4]/70 transition hover:bg-white"
        aria-label="Toggle favorite"
      >
        <motion.span
          className={`text-sm leading-none ${
            isFavorite ? "text-[#A87048]" : "text-[#C4A480]"
          }`}
          animate={isFavorite ? { scale: [1, 1.45, 1] } : {}}
          transition={{ duration: 0.28 }}
        >
          {isFavorite ? "♥" : "♡"}
        </motion.span>
      </button>

      <Link
        href={`/project/${project.slug}`}
        onClick={() => trackProjectView(project.id)}
        className="group flex flex-col"
      >
        <div className="relative flex-shrink-0 overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title[locale] || project.title["zh-TW"]}
            width={900}
            height={900}
            className="w-full object-cover transform-gpu transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col space-y-1 px-3 pb-3 pt-2.5 text-left sm:space-y-1.5 sm:px-4 sm:pb-4 sm:pt-3">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-[#9A8068] uppercase sm:text-xs">
            {project.category[locale] || project.category["zh-TW"]}
          </p>
          <h2 className="text-sm font-bold leading-snug text-[#1E1510] sm:text-base">
            {project.title[locale] || project.title["zh-TW"]}
          </h2>
          <p className="text-[11px] text-[#9A8068] sm:text-xs">
            {project.timeSpent[locale] || project.timeSpent["zh-TW"]}
          </p>
          {/* Color Palette with tooltip */}
          <div className="flex items-center gap-1 pt-0.5 sm:gap-1.5">
            {project.colorPalette.map((color, i) => (
              <div
                key={i}
                className="group/color relative h-3 w-3 rounded-full ring-1 ring-[#E4D0B4]/80"
                style={{ backgroundColor: color }}
              >
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-[#1E1510] px-1 py-0.5 text-[9px] text-white opacity-0 transition-opacity group-hover/color:opacity-100">
                  {color}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function MainSection({
  projects,
  locale,
  t,
}: MainSectionProps) {
  const latestId = Math.max(...projects.map((p) => p.id));

  return (
    <main
      id="projects"
      className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8"
    >
      {/* Intro / Subheader */}
      <section className="mb-8 space-y-2">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#9A8068] uppercase">
          {t("intro.subtitle")}
        </p>
        <h1 className="text-2xl font-bold tracking-wide text-[#1E1510] sm:text-3xl">
          {t("intro.title")}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#6A4C38]">
          {t("intro.description")}
        </p>
      </section>

      {/* Waterfall / Masonry Layout */}
      <section
        aria-label={t("project.listLabel")}
        className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:gap-5"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={locale}
            t={t}
            isLatest={project.id === latestId}
            index={index}
          />
        ))}
      </section>
    </main>
  );
}
