# SEO 優化設定指南

## 📋 已完成的功能

### 1. 動態 Meta Tags
- ✅ 首頁 SEO metadata（多語言）
- ✅ 作品頁面 SEO metadata
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ 多語言 alternate links

### 2. 結構化資料（JSON-LD）
- ✅ Schema.org Product 結構
- ✅ 自動生成到作品頁面

### 3. Sitemap
- ✅ 自動生成 `sitemap.xml`
- ✅ 包含所有語言版本
- ✅ 包含所有作品頁面

### 4. Robots.txt
- ✅ 自動生成 `robots.txt`
- ✅ 禁止爬取 admin 和 API 路徑

## 🚀 設定步驟

### 1. 設定環境變數

在 `.env.local` 或 Vercel 環境變數中新增：

```bash
NEXT_PUBLIC_BASE_URL=https://crochet-celia.vercel.app
```

**重要：** 替換成你的實際網域！

### 2. 驗證 SEO 設定

部署後，檢查以下 URL：

- `https://crochet-celia.vercel.app/sitemap.xml` - 應該看到所有頁面
- `https://crochet-celia.vercel.app/robots.txt` - 應該看到爬蟲規則
- 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 測試結構化資料
- 使用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 測試 Open Graph

### 3. 提交到搜尋引擎

#### Google Search Console
1. 前往 [Google Search Console](https://search.google.com/search-console)
2. 新增屬性（你的網域）
3. 提交 sitemap: `https://crochet-celia.vercel.app/sitemap.xml`

#### Bing Webmaster Tools
1. 前往 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 新增網站
3. 提交 sitemap

## 🔧 MCP Server 使用

### 安裝 MCP Server

```bash
cd mcp-seo-server
npm install
```

### 設定 Cursor MCP

在 Cursor Settings → Features → MCP Servers 新增：

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

### 使用 MCP 工具

在 Cursor 中，你可以直接說：

- "為作品 #1 生成 meta tags（繁體中文）"
- "生成完整的 sitemap.xml"
- "生成 robots.txt"
- "為作品 #3 生成結構化資料（英文）"
- "為作品 #2 的圖片生成 alt text"

## 📊 SEO 檢查清單

- [x] Meta title 和 description
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] 結構化資料（JSON-LD）
- [x] Sitemap.xml
- [x] Robots.txt
- [x] 多語言 hreflang tags
- [x] Canonical URLs
- [ ] 圖片 alt text（需要在組件中使用 `generateImageAlt`）
- [ ] 頁面載入速度優化
- [ ] 行動裝置友善性

## 🎯 下一步優化建議

1. **圖片優化**
   - 使用 Next.js Image 組件
   - 生成 WebP 格式
   - 添加 lazy loading

2. **內容優化**
   - 為每個作品添加更多關鍵字
   - 優化描述長度（150-160 字元）

3. **效能優化**
   - 使用 CDN
   - 啟用 Gzip 壓縮
   - 優化字體載入

4. **分析工具**
   - 整合 Google Analytics
   - 追蹤 SEO 表現

## 📝 注意事項

1. **環境變數**：確保 `NEXT_PUBLIC_BASE_URL` 設定正確
2. **作品頁面路由**：目前建立了 `/project/[slug]` 路由，但主頁面還是用 modal 顯示。可以考慮：
   - 保留 modal（目前方式）
   - 或改用獨立頁面（已建立的路由）
3. **圖片 Alt Text**：需要在 `ProjectDetailModal` 組件中使用 `generateImageAlt` 函數

## 🐛 疑難排解

### Sitemap 沒有顯示作品
- 檢查 `data/project.ts` 中的 `slug` 欄位是否正確
- 確認 `generateStaticParams` 有正確執行

### 結構化資料驗證失敗
- 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 檢查
- 確認 JSON-LD 格式正確

### Meta tags 沒有更新
- 清除瀏覽器快取
- 使用無痕模式測試
- 檢查 `generateMetadata` 函數是否正確執行

