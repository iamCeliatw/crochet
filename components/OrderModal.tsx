"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useState } from "react";

interface OrderModalProps {
  projectTitle: string;
  projectId: number;
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export default function OrderModal({
  projectTitle,
  projectId,
  isOpen,
  onClose,
  t,
}: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    contactMethod: "line" as "line" | "email" | "instagram",
    quantity: 1,
    customization: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClose = () => {
    // 重置所有狀態
    setIsSuccess(false);
    setError("");
    setFormData({
      name: "",
      contact: "",
      contactMethod: "line",
      quantity: 1,
      customization: "",
    });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 驗證 email 格式
    if (
      formData.contactMethod === "email" &&
      !validateEmail(formData.contact)
    ) {
      setError(t("order.invalidEmail"));
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        projectId,
        projectTitle,
        ...formData,
        timestamp: new Date().toISOString(),
      };

      // 發送到 LINE Notify
      const response = await fetch("/api/send-line-notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to send notification");
      }

      // 也存到 localStorage 作為備份
      const existingOrders = JSON.parse(
        localStorage.getItem("crochet_orders") || "[]"
      );
      existingOrders.push(orderData);
      localStorage.setItem("crochet_orders", JSON.stringify(existingOrders));

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
      setError(t("order.submitError"));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-6 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute inset-0 h-full w-full cursor-default"
          aria-label={t("actions.close")}
        />

        <motion.div
          className="relative z-50 w-full max-w-md overflow-hidden rounded-2xl bg-[#FDFBF7] shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-white/80 p-1.5 text-[#666666] shadow-sm ring-1 ring-neutral-200/80 transition hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center gap-5 px-6 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Send className="h-7 w-7 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#333333]">
                  {t("order.successTitle")}
                </h3>
                <p className="text-sm text-[#666666]">
                  {t("order.successMessage")}
                </p>
              </div>

              {/* LINE 好友連結 */}
              <div className="w-full space-y-3 border-t border-neutral-200 pt-5">
                <p className="text-sm font-medium text-[#666666]">
                  {t("order.addLinePrompt")}
                </p>
                <a
                  href={`https://line.me/R/ti/p/${process.env.NEXT_PUBLIC_LINE_OA_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#06C755] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#05B34B] active:scale-95"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  {t("order.addLineFriend")}
                </a>
                <p className="text-xs text-[#999999]">
                  {t("order.addLineHint")}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-8">
              <div className="mb-6 space-y-2">
                <h3 className="text-xl font-semibold tracking-wide text-[#333333]">
                  {t("order.title")}
                </h3>
                <p className="text-sm text-[#666666]">{projectTitle}</p>
              </div>

              <div className="space-y-4">
                {/* 姓名 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#666666]">
                    {t("order.name")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-[#333333] transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200/50"
                    placeholder={t("order.namePlaceholder")}
                  />
                </div>

                {/* 聯絡方式選擇 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#666666]">
                    {t("order.contactMethod")}{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    {(["line", "email", "instagram"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, contactMethod: method })
                        }
                        className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                          formData.contactMethod === method
                            ? "border-neutral-400 bg-white text-[#333333] shadow-sm"
                            : "border-neutral-200 text-[#999999] hover:border-neutral-300"
                        }`}
                      >
                        {method === "line" && "LINE"}
                        {method === "email" && "Email"}
                        {method === "instagram" && "IG"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 聯絡資訊 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#666666]">
                    {formData.contactMethod === "line" && "LINE ID"}
                    {formData.contactMethod === "email" && "Email"}
                    {formData.contactMethod === "instagram" && "Instagram"}
                    <span className="text-red-400"> *</span>
                  </label>
                  <input
                    type={formData.contactMethod === "email" ? "email" : "text"}
                    required
                    value={formData.contact}
                    onChange={(e) => {
                      setFormData({ ...formData, contact: e.target.value });
                      setError(""); // 清除錯誤訊息
                    }}
                    className={`w-full rounded-lg border px-3 py-2 text-sm text-[#333333] transition focus:outline-none focus:ring-2 ${
                      error
                        ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200/50"
                        : "border-neutral-200 bg-white focus:border-neutral-400 focus:ring-neutral-200/50"
                    }`}
                    placeholder={
                      formData.contactMethod === "email"
                        ? "example@email.com"
                        : formData.contactMethod === "line"
                        ? "your_line_id"
                        : "@your_instagram"
                    }
                  />
                  {error && <p className="text-xs text-red-500">{error}</p>}
                </div>

                {/* 數量 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#666666]">
                    {t("order.quantity")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-[#333333] transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200/50"
                  />
                </div>

                {/* 客製化需求 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#666666]">
                    {t("order.customization")}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.customization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customization: e.target.value,
                      })
                    }
                    className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-[#333333] transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200/50"
                    placeholder={t("order.customizationPlaceholder")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#333333] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#444444] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t("order.submitting")}</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{t("order.submit")}</span>
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs text-[#999999]">
                {t("order.notice")}
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
