"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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

      // 在最頂部時永遠顯示
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // 向上滾動時顯示
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // 向下滾動時隱藏（滾動超過 100px 後才隱藏）
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 border-b border-neutral-200/60 bg-[#FDFBF7]/90 backdrop-blur transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="hidden text-sm font-medium tracking-[0.2em] text-[#666666] uppercase sm:inline">
            {t("header.brandSubtitle")}
          </span>
          <span className="text-base font-semibold tracking-wide sm:text-lg">
            {t("header.brand")}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher */}
          <div className="relative inline-flex rounded-full border border-neutral-300/70 bg-white/50 p-0.5">
            <button
              type="button"
              onClick={() => switchLocale("zh-TW")}
              className={`cursor-pointer px-1.5 py-0.5 text-[11px] font-medium transition rounded-full sm:px-2 sm:py-1 sm:text-xs ${
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
              className={`cursor-pointer px-1.5 py-0.5 text-[11px] font-medium transition rounded-full sm:px-2 sm:py-1 sm:text-xs ${
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
              className={`cursor-pointer px-1.5 py-0.5 text-[11px] font-medium transition rounded-full sm:px-2 sm:py-1 sm:text-xs ${
                locale === "ja"
                  ? "bg-white text-[#333333] shadow-sm"
                  : "text-[#999999] hover:text-[#666666]"
              }`}
            >
              日本語
            </button>
          </div>

          {/* <a
            href="https://www.instagram.com/shuu_chang"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300/70 px-2.5 py-1 text-sm text-[#666666] transition hover:border-neutral-400 hover:bg-white/70 sm:gap-2 sm:px-3"
          >
            <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{t("header.instagram")}</span>
          </a> */}
        </div>
      </div>
    </header>
  );
}
