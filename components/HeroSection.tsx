"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  t: (key: string) => string;
  onOrderClick: () => void;
}

function YarnBall({
  size = 40,
  delay = 0,
  xPercent = 0,
  yPercent = 0,
  opacity = 0.5,
}: {
  size?: number;
  delay?: number;
  xPercent?: number;
  yPercent?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${xPercent}%`, top: `${yPercent}%`, opacity }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4 + delay * 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18" fill="#E4D0B4" />
        <path
          d="M5 16 Q20 8 35 16"
          stroke="#A87048"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M4 21 Q20 13 36 21"
          stroke="#A87048"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M5 26 Q20 18 35 26"
          stroke="#A87048"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M20 2 Q28 12 24 20 Q20 28 26 38"
          stroke="#8C5A30"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </motion.div>
  );
}

function CrochetHook() {
  return (
    <motion.div
      className="absolute right-[7%] top-[20%] pointer-events-none hidden sm:block"
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width="24"
        height="64"
        viewBox="0 0 24 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="10" y="0" width="4" height="44" rx="2" fill="#E4D0B4" opacity="0.8" />
        <path
          d="M12 44 Q20 51 18 58 Q16 63 10 63 Q4 63 4 58"
          stroke="#C4A480"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="10" cy="58" r="3.5" fill="#E4D0B4" opacity="0.8" />
      </svg>
    </motion.div>
  );
}

export default function HeroSection({ t, onOrderClick }: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = t("hero.tagline");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 65);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24"
      style={{
        background: "linear-gradient(150deg, #F8F5F0 0%, #F0E8DC 100%)",
      }}
    >
      {/* Subtle floating decorations */}
      <YarnBall size={56} delay={0} xPercent={3} yPercent={10} opacity={0.45} />
      <YarnBall size={38} delay={1.2} xPercent={87} yPercent={18} opacity={0.35} />
      <CrochetHook />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#9A8068] uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Handmade Crochet
        </motion.p>

        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-[#1E1510] sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          {t("header.brand")}
        </motion.h1>

        <motion.div
          className="mt-4 min-h-[1.75rem] text-sm text-[#6A4C38] sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {displayedText}
          <span className="animate-pulse opacity-60">｜</span>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-[#A87048] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#8C5A30] hover:shadow-md"
          >
            {t("hero.cta.view")}
          </a>
          <button
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 rounded-full border border-[#C4A480] bg-transparent px-6 py-2.5 text-sm font-bold text-[#A87048] transition hover:-translate-y-0.5 hover:bg-[#F0E8DC]"
          >
            {t("hero.cta.order")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
