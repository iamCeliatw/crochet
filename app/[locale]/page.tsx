"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "../../data/project";
import Header from "@/components/Header";
import MainSection from "@/components/MainSection";
import { trackPageView } from "@/lib/analytics";

export default function CrochetPortfolioPage() {
  const t = useTranslations();
  const locale = useLocale();

  // 追蹤頁面訪問
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333]">
      <Header />

      <MainSection
        projects={projects}
        locale={locale}
        t={t}
      />
    </div>
  );
}
