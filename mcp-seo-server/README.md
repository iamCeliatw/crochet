# SEO MCP Server

為鉤針作品網站提供 SEO 優化工具的 MCP server。

## 功能

1. **生成 Meta Tags** - 為每個作品生成 SEO 友善的 meta tags
2. **生成結構化資料** - 生成 JSON-LD Schema.org 結構化資料
3. **生成 Sitemap** - 自動生成包含所有作品頁面的 sitemap.xml
4. **生成 robots.txt** - 生成搜尋引擎爬蟲規則
5. **優化圖片 Alt Text** - 為圖片生成 SEO 友善的 alt text

## 安裝

```bash
cd mcp-seo-server
npm install
```

## 設定 MCP Server

在 Cursor 設定中（Settings → Features → MCP Servers）新增：

```json
{
  "mcpServers": {
    "crochet-seo": {
      "command": "node",
      "args": ["mcp-seo-server/index.js"],
      "cwd": "."
    }
  }
}
```

## 使用方式

在 Cursor 中，你可以直接說：

- "為作品 #1 生成 meta tags"
- "生成 sitemap.xml"
- "生成 robots.txt"
- "為作品 #3 生成結構化資料"

MCP server 會自動處理並返回結果。

