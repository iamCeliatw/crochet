import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Analytics - Crochet Admin",
  description: "Analytics Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
