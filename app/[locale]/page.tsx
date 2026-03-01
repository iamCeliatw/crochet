"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "../../data/project";
import Header from "@/components/Header";
import MainSection from "@/components/MainSection";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import { trackPageView } from "@/lib/analytics";

export default function CrochetPortfolioPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // 追蹤頁面訪問
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen text-[#333333]">
      <Header />

      <HeroSection
        t={t}
        onOrderClick={() => setIsOrderModalOpen(true)}
      />

      <MainSection
        projects={projects}
        locale={locale}
        t={t}
      />

      <Footer t={t} />

      <OrderModal
        projectTitle={t("order.title")}
        projectId={0}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        t={t}
      />
    </div>
  );
}
