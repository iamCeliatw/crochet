import type { Metadata } from "next";
import { projects } from "@/data/project";

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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
const siteName = "小小鉤針日常";
const defaultDescription =
  "翻動線材的瞬間，日常也能被柔軟包圍。手作鉤針作品展示與訂購。";

/**
 * 為首頁生成 SEO metadata
 */
export function generateHomeMetadata(locale: string): Metadata {
  const title = locale === "zh-TW" 
    ? "小小鉤針日常 | 手作鉤針作品"
    : locale === "en"
    ? "Crochet Daily | Handmade Crochet"
    : "クロシェ日常 | ハンドメイドクロシェ";

  const description = locale === "zh-TW"
    ? defaultDescription
    : locale === "en"
    ? "In the moment of turning the yarn, everyday life can be embraced by softness. Handmade crochet portfolio and orders."
    : "糸を回す瞬間、日常も柔らかさに包まれます。ハンドメイドクロシェ作品の展示と注文。";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName,
      locale,
      type: "website",
      images: [
        {
          url: `${baseUrl}/projects/project-1_1.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/projects/project-1_1.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "zh-TW": `${baseUrl}/zh-TW`,
        en: `${baseUrl}/en`,
        ja: `${baseUrl}/ja`,
      },
    },
  };
}

/**
 * 為作品頁面生成 SEO metadata
 */
export function generateProjectMetadata(
  project: Project,
  locale: string
): Metadata {
  const title = project.title[locale] || project.title["zh-TW"];
  const description = project.description[locale] || project.description["zh-TW"];
  const category = project.category[locale] || project.category["zh-TW"];
  
  const fullTitle = `${title} | ${siteName}`;
  const metaDescription = description.substring(0, 160);

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: [
      "鉤針",
      "crochet",
      "手作",
      "handmade",
      category,
      title,
    ].join(", "),
    openGraph: {
      title,
      description: description.substring(0, 200),
      url: `${baseUrl}/${locale}/project/${project.slug}`,
      siteName,
      locale,
      type: "website",
      images: [
        {
          url: `${baseUrl}${project.coverImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.substring(0, 200),
      images: [`${baseUrl}${project.coverImage}`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/project/${project.slug}`,
      languages: {
        "zh-TW": `${baseUrl}/zh-TW/project/${project.slug}`,
        en: `${baseUrl}/en/project/${project.slug}`,
        ja: `${baseUrl}/ja/project/${project.slug}`,
      },
    },
  };
}

/**
 * 為作品生成結構化資料（JSON-LD）
 */
export function generateStructuredData(
  project: Project,
  locale: string
): object {
  const title = project.title[locale] || project.title["zh-TW"];
  const description = project.description[locale] || project.description["zh-TW"];
  const category = project.category[locale] || project.category["zh-TW"];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: description,
    image: `${baseUrl}${project.coverImage}`,
    category: category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "TWD",
      url: `${baseUrl}/${locale}/project/${project.slug}`,
    },
    brand: {
      "@type": "Brand",
      name: siteName,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
    },
  };
}

/**
 * 為圖片生成 SEO 友善的 alt text
 */
export function generateImageAlt(
  project: Project,
  imageIndex: number,
  locale: string
): string {
  const title = project.title[locale] || project.title["zh-TW"];
  const category = project.category[locale] || project.category["zh-TW"];

  if (locale === "zh-TW") {
    return `${title} - ${category} - 鉤針手作作品圖片 ${imageIndex + 1}`;
  } else if (locale === "en") {
    return `${title} - ${category} - Handmade crochet product image ${imageIndex + 1}`;
  } else {
    return `${title} - ${category} - ハンドメイドクロシェ作品画像 ${imageIndex + 1}`;
  }
}

