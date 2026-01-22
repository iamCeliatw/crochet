import { MetadataRoute } from "next";
import { projects } from "@/data/project";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
  const urls: MetadataRoute.Sitemap = [];

  // 首頁（所有語言）
  for (const locale of routing.locales) {
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`])
        ),
      },
    });
  }

  // 作品頁面（所有語言）
  for (const project of projects) {
    for (const locale of routing.locales) {
      urls.push({
        url: `${baseUrl}/${locale}/project/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              loc,
              `${baseUrl}/${loc}/project/${project.slug}`,
            ])
          ),
        },
      });
    }
  }

  return urls;
}

