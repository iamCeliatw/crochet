#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 專案根目錄（假設 mcp-seo-server 在專案根目錄下）
const PROJECT_ROOT = join(__dirname, "..");

// 讀取專案資料
function getProjects() {
  try {
    const projectFile = join(PROJECT_ROOT, "data", "project.ts");
    const content = readFileSync(projectFile, "utf-8");
    
    // 簡單解析 projects 陣列（實際使用時可能需要更複雜的解析）
    const projectsMatch = content.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/);
    if (!projectsMatch) return [];
    
    // 這裡簡化處理，實際應該用 TypeScript parser
    // 為了示範，我們返回基本結構
    return [];
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}

// 生成 meta tags
function generateMetaTags(project, locale, baseUrl) {
  const title = project.title[locale] || project.title["zh-TW"];
  const description = project.description[locale] || project.description["zh-TW"];
  const category = project.category[locale] || project.category["zh-TW"];
  
  return {
    title: `${title} | 小小鉤針日常`,
    description: description.substring(0, 160),
    keywords: [
      "鉤針",
      "crochet",
      "手作",
      "handmade",
      category,
      title,
    ].join(", "),
    openGraph: {
      title: title,
      description: description.substring(0, 200),
      images: [`${baseUrl}${project.coverImage}`],
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description.substring(0, 200),
      images: [`${baseUrl}${project.coverImage}`],
    },
  };
}

// 生成結構化資料（JSON-LD）
function generateStructuredData(project, locale, baseUrl) {
  const title = project.title[locale] || project.title["zh-TW"];
  const description = project.description[locale] || project.description["zh-TW"];
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: description,
    image: `${baseUrl}${project.coverImage}`,
    category: project.category[locale] || project.category["zh-TW"],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "TWD",
    },
    brand: {
      "@type": "Brand",
      name: "小小鉤針日常",
    },
  };
}

// 生成 sitemap
function generateSitemap(projects, baseUrl, locales) {
  const urls = [];
  
  // 首頁
  for (const locale of locales) {
    urls.push({
      loc: `${baseUrl}/${locale}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "1.0",
    });
  }
  
  // 作品頁面
  for (const project of projects) {
    for (const locale of locales) {
      urls.push({
        loc: `${baseUrl}/${locale}/project/${project.slug}`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: "0.8",
      });
    }
  }
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
  
  return sitemap;
}

// 生成 robots.txt
function generateRobotsTxt(baseUrl) {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;
}

const server = new Server(
  {
    name: "crochet-seo-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// 列出可用工具
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "generate_meta_tags",
      description: "為指定作品生成 SEO meta tags（title, description, Open Graph, Twitter Card）",
      inputSchema: {
        type: "object",
        properties: {
          projectId: {
            type: "number",
            description: "作品 ID",
          },
          locale: {
            type: "string",
            enum: ["zh-TW", "en", "ja"],
            description: "語言代碼",
          },
          baseUrl: {
            type: "string",
            description: "網站基礎 URL（例如：https://crochet-celia.vercel.app）",
          },
        },
        required: ["projectId", "locale", "baseUrl"],
      },
    },
    {
      name: "generate_structured_data",
      description: "為指定作品生成結構化資料（JSON-LD Schema.org）",
      inputSchema: {
        type: "object",
        properties: {
          projectId: {
            type: "number",
            description: "作品 ID",
          },
          locale: {
            type: "string",
            enum: ["zh-TW", "en", "ja"],
            description: "語言代碼",
          },
          baseUrl: {
            type: "string",
            description: "網站基礎 URL",
          },
        },
        required: ["projectId", "locale", "baseUrl"],
      },
    },
    {
      name: "generate_sitemap",
      description: "生成完整的 sitemap.xml",
      inputSchema: {
        type: "object",
        properties: {
          baseUrl: {
            type: "string",
            description: "網站基礎 URL",
          },
          locales: {
            type: "array",
            items: { type: "string", enum: ["zh-TW", "en", "ja"] },
            description: "支援的語言列表",
            default: ["zh-TW", "en", "ja"],
          },
        },
        required: ["baseUrl"],
      },
    },
    {
      name: "generate_robots_txt",
      description: "生成 robots.txt",
      inputSchema: {
        type: "object",
        properties: {
          baseUrl: {
            type: "string",
            description: "網站基礎 URL",
          },
        },
        required: ["baseUrl"],
      },
    },
    {
      name: "optimize_image_alt",
      description: "為作品圖片生成 SEO 友善的 alt text",
      inputSchema: {
        type: "object",
        properties: {
          projectId: {
            type: "number",
            description: "作品 ID",
          },
          locale: {
            type: "string",
            enum: ["zh-TW", "en", "ja"],
            description: "語言代碼",
          },
        },
        required: ["projectId", "locale"],
      },
    },
  ],
}));

// 處理工具呼叫
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "generate_meta_tags": {
        // 這裡需要實際讀取專案資料
        // 為了示範，我們返回模板
        const metaTags = generateMetaTags(
          { title: {}, description: {}, category: {}, coverImage: "" },
          args.locale,
          args.baseUrl
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(metaTags, null, 2),
            },
          ],
        };
      }

      case "generate_structured_data": {
        const structuredData = generateStructuredData(
          { title: {}, description: {}, coverImage: "" },
          args.locale,
          args.baseUrl
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(structuredData, null, 2),
            },
          ],
        };
      }

      case "generate_sitemap": {
        const sitemap = generateSitemap(
          [],
          args.baseUrl,
          args.locales || ["zh-TW", "en", "ja"]
        );
        return {
          content: [
            {
              type: "text",
              text: sitemap,
            },
          ],
        };
      }

      case "generate_robots_txt": {
        const robotsTxt = generateRobotsTxt(args.baseUrl);
        return {
          content: [
            {
              type: "text",
              text: robotsTxt,
            },
          ],
        };
      }

      case "optimize_image_alt": {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                alt: "鉤針作品圖片",
                suggestions: [
                  "使用作品名稱作為 alt text",
                  "包含關鍵字：鉤針、手作、crochet",
                  "描述圖片內容",
                ],
              }),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// 啟動 server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SEO MCP Server running on stdio");
}

main().catch(console.error);

