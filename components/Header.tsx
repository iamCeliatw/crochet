"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function YarnBallIcon() {
  return (
    <svg
      width="18"
      height="18"
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
        opacity="0.7"
      />
      <path
        d="M4 21 Q20 13 36 21"
        stroke="#A87048"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M5 26 Q20 18 35 26"
        stroke="#A87048"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M20 2 Q28 12 24 20 Q20 28 26 38"
        stroke="#8C5A30"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export default function Header() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 border-b border-[#DDD0BC]/60 bg-[#F8F5F0]/92 backdrop-blur transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <YarnBallIcon />
          <span className="hidden text-sm font-medium tracking-[0.2em] text-[#9A8068] uppercase sm:inline">
            {t("header.brandSubtitle")}
          </span>
          <span className="text-base font-bold tracking-wide text-[#1E1510] sm:text-lg">
            {t("header.brand")}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher */}
          <div className="relative inline-flex rounded-full border border-[#DDD0BC]/70 bg-white/50 p-0.5">
            {(["zh-TW", "en", "ja"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => switchLocale(lang)}
                className={`cursor-pointer px-1.5 py-0.5 text-[11px] font-medium transition rounded-full sm:px-2 sm:py-1 sm:text-xs ${
                  locale === lang
                    ? "bg-[#E4D0B4] text-[#3A2416] shadow-sm"
                    : "text-[#9A8068] hover:text-[#6A4C38]"
                }`}
              >
                {lang === "zh-TW" ? "中文" : lang === "en" ? "EN" : "日本語"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
