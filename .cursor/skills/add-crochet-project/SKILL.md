---
name: add-crochet-project
description: 分析勾針作品圖片，生成多語言文案，並新增到網站。當用戶上傳作品圖片或說「新增作品」時使用。
---

# 新增勾針作品

自動分析上傳的勾針作品圖片，生成繁中/英文/日文三語文案，更新專案資料並部署。

## When to Use

- 當用戶上傳勾針作品圖片時
- 當用戶說「新增作品」、「add project」、「分析這個作品」時
- 當用戶想要把新作品加到網站上時

## Instructions

### 步驟 1: 分析圖片

使用 AI Vision 分析上傳的圖片：

1. **識別作品類型**
   - 髮帶 (Hairband / ヘアバンド)
   - 耳機包 (Earphone Case / イヤホンケース)
   - 杯墊 (Coaster / コースター)
   - 袖套 (Sleeve Cuffs / 袖カバー)
   - 其他配件

2. **提取配色**
   - 識別主要顏色（2-4 種）
   - 轉換為 Hex codes（如 #F4A896）

3. **判斷編織技法**
   - 蕾絲編織
   - 祖母方格
   - 立體花朵
   - 貝殼針法
   - 其他

4. **觀察材質和風格**
   - 棉線 / 毛線
   - 精緻 / 可愛 / 優雅

### 步驟 2: 生成多語言文案

根據圖片分析結果，生成以下內容：

**繁體中文風格**：溫暖、細膩、富有情感
- 使用詞彙：溫柔、舒心、療癒、陪伴、手作溫度
- 描繪使用情境和感受
- 50-100 字

**英文風格**：簡潔優雅，強調 handcrafted
- 使用詞彙：cozy, handcrafted, delicate, charming, comforting
- 30-60 words

**日文風格**：柔和可愛，注重細節
- 使用詞彙：優しい、可愛い、心地よい、丁寧、温かみ
- 40-80 字

### 步驟 3: 生成專案資料

讀取 `data/project.ts`，取得目前最大 ID，然後生成新專案：

```typescript
{
  id: [最大ID + 1],
  slug: "[根據繁中標題生成，如 elegant-lace-hairband]",
  title: {
    "zh-TW": "[繁中標題]",
    en: "[英文標題]",
    ja: "[日文標題]"
  },
  category: {
    "zh-TW": "[類型] / 日常使用",
    en: "[Category] / Daily Use",
    ja: "[カテゴリー] / デイリーユース"
  },
  materials: {
    "zh-TW": "四股棉線、[X]mm 勾針",
    en: "4-ply cotton yarn, [X]mm crochet hook",
    ja: "4本撚りコットン糸、[X]mmかぎ針"
  },
  timeSpent: {
    "zh-TW": "約 [X] 小時",
    en: "About [X] hours",
    ja: "約[X]時間"
  },
  description: {
    "zh-TW": "[溫暖風格描述]",
    en: "[Elegant description]",
    ja: "[可愛風格描述]"
  },
  coverImage: "/projects/project-[ID]_1.jpg",
  images: ["/projects/project-[ID]_1.jpg", "/projects/project-[ID]_2.jpg"],
  colorPalette: ["#HEX1", "#HEX2", ...]
}
```

### 步驟 4: 更新檔案

1. **更新 data/project.ts**
   - 在 `projects` 陣列末尾新增專案
   - 確保格式正確（逗號、縮排）

2. **處理圖片**
   - 將上傳的圖片複製到 `public/projects/`
   - 重命名為 `project-[ID]_1.jpg`、`project-[ID]_2.jpg`

### 步驟 5: 確認與部署

1. 顯示新增的專案預覽
2. 詢問用戶是否確認
3. 如果確認，詢問是否要部署到 Vercel

## 範例對話

**用戶**：（上傳 2 張圖片）請幫我新增這個作品

**AI**：我看到了一個精緻的蕾絲髮帶！

**分析結果**：
- 類型：髮帶
- 配色：淡紫色 (#E6D5E8)、白色 (#FFFFFF)
- 技法：蕾絲花紋
- 風格：優雅細膩

**建議內容**：

📝 **標題**
- 繁中：優雅蕾絲髮帶
- 英文：Elegant Lace Hairband
- 日文：エレガントレースヘアバンド

📝 **描述**
- 繁中：繁複的蕾絲花紋，每一針都是耐心與溫柔的堆疊。淡紫與白色的層疊設計，為日常增添一抹優雅...

要我新增到網站嗎？

## 注意事項

- 圖片格式支援 JPG、PNG
- 建議上傳 2 張圖片（封面 + 細節）
- 確保 `data/project.ts` 格式正確後再儲存
- 部署前會先確認用戶同意

