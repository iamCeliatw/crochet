# 🤖 Cursor Skills & MCP 自動化指南

本指南說明如何使用 Cursor AI 的 Skills 和自動化腳本來管理勾針作品網站。

## 📋 目錄

1. [環境設定](#環境設定)
2. [Cursor Skills 使用](#cursor-skills-使用)
3. [自動化工作流程](#自動化工作流程)
4. [MCP 配置](#mcp-配置)
5. [常見問題](#常見問題)

---

## 🔧 環境設定

### 1. 確認 Git 設定

確保你的專案已連接到 GitHub：

```bash
git remote -v
```

如果沒有，請設定：

```bash
git init
git remote add origin <你的 GitHub 倉庫 URL>
```

### 2. 確認 Vercel 設定

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 確認專案已連接到你的 GitHub 倉庫
3. 確保「Auto Deploy」已啟用（預設啟用）

### 3. 安裝依賴

```bash
npm install
```

---

## 🎨 Cursor Skills 使用

### 自動觸發關鍵字

在 Cursor AI Chat 中使用以下關鍵字會自動觸發對應的工作流程：

| 關鍵字 | 觸發動作 |
|--------|----------|
| `新增作品` / `add project` | 啟動新增作品流程 |
| `優化文案` / `improve description` | 優化現有作品描述 |
| `部署` / `deploy` | 部署到 Vercel |
| `分析圖片` / `analyze image` | AI 分析上傳的作品圖片 |

### 範例對話

#### 新增作品

```
你: 我想新增一個新的勾針作品
（上傳 2 張圖片）

AI: 我看到你上傳了圖片，讓我分析一下...
    這看起來是一個粉色的髮帶，使用了蕾絲編織技法。
    
    我建議的內容：
    
    標題：
    - 繁中: 蕾絲花漾髮帶
    - 英文: Lace Floral Hairband
    - 日文: レースフローラルヘアバンド
    
    描述：
    - 繁中: 精緻的蕾絲花紋設計，粉紅與白色的優雅配色...
    ...
    
    要我幫你新增到專案嗎？
```

---

## ⚙️ 自動化工作流程

### 方法 1: 使用 Cursor AI（推薦）

**最簡單的方式！直接在 Cursor 對話：**

1. **上傳圖片到 Cursor Chat**
   
   在 Cursor AI Chat 中點擊 📎 圖示，上傳 1-2 張作品照片

2. **請求分析與新增**
   
   ```
   請幫我分析這個勾針作品並新增到網站
   ```

3. **AI 會自動：**
   - 分析圖片內容（顏色、風格、類型）
   - 生成多語言文案（繁中、英文、日文）
   - 更新 `data/project.ts`
   - 複製圖片到 `public/projects/`
   - 提供部署選項

4. **確認後部署**
   
   ```
   看起來不錯，請幫我部署到 Vercel
   ```

### 方法 2: 使用命令列腳本（進階）

如果你偏好使用命令列：

#### Step 1: 準備圖片並開始流程

```bash
npm run add-project path/to/image1.jpg path/to/image2.jpg
```

這會：
- 複製圖片到 `public/projects/`
- 顯示一個 AI 提示模板

#### Step 2: 在 Cursor 中取得 AI 文案

1. 將步驟 1 輸出的提示詞複製
2. 在 Cursor AI Chat 中貼上
3. 上傳圖片讓 AI 分析
4. AI 會回覆 JSON 格式的文案

#### Step 3: 完成新增

```bash
npm run finalize-project <專案ID> '<AI 回覆的 JSON>'
```

範例：

```bash
npm run finalize-project 7 '{
  "title": {"zh-TW": "蕾絲髮帶", "en": "Lace Hairband", "ja": "レースヘアバンド"},
  "category": {"zh-TW": "髮飾 / 日常使用", "en": "Hair Accessory", "ja": "ヘアアクセサリー"},
  ...
}'
```

#### Step 4: 部署

```bash
npm run deploy
```

---

## 🔗 MCP 配置（進階功能）

### 什麼是 MCP？

Model Context Protocol (MCP) 讓 Cursor AI 能夠：
- 直接存取檔案系統
- 執行自定義命令
- 整合外部工具（如圖片處理、API 呼叫）

### 啟用 MCP（可選）

1. **在 Cursor 設定中啟用 MCP**
   
   - 開啟 Cursor 設定（`Ctrl/Cmd + ,`）
   - 搜尋 "MCP"
   - 啟用 "Enable Model Context Protocol"

2. **專案已包含的 MCP 相關檔案**
   
   - `.cursorrules` - 定義 AI 行為規則
   - `scripts/` - 自動化腳本

3. **Cursor 會自動使用這些規則**
   
   當你在 Chat 中提到相關關鍵字時，AI 會遵循 `.cursorrules` 中定義的流程。

---

## 🎯 完整流程範例

### 情境：新增一個新的貓咪耳機包

1. **拍攝作品照片**（2 張）

2. **在 Cursor AI Chat 中：**
   
   ```
   我有一個新的貓咪耳機包作品，幫我新增到網站
   ```
   
   （同時上傳 2 張圖片）

3. **AI 回應：**
   
   ```
   我看到了！這是一個可愛的貓咪造型耳機包。
   讓我為你生成內容...
   
   [顯示生成的多語言文案]
   
   要我幫你新增到專案嗎？
   ```

4. **你確認：**
   
   ```
   好的，請新增
   ```

5. **AI 執行：**
   
   - ✅ 圖片已複製到 public/projects/
   - ✅ 已更新 data/project.ts
   - ✅ 專案 ID: 7
   
   要立即部署到 Vercel 嗎？

6. **部署：**
   
   ```
   是的，請部署
   ```

7. **完成！** 🎉
   
   你的網站已自動更新並部署。

---

## 💡 進階技巧

### 1. 批次優化文案

```
請幫我優化所有作品的描述，讓它們更有情感和溫度
```

AI 會：
- 分析所有現有專案
- 提供改進建議
- 逐一更新描述

### 2. 自動色彩提取

上傳圖片時，AI 會自動識別主要顏色並生成 `colorPalette`：

```javascript
colorPalette: ["#F4A896", "#6B9CAF", "#FEFEFE"]
```

### 3. SEO 優化建議

```
請幫我檢查專案的 SEO 並給建議
```

AI 會分析：
- 標題長度
- 描述是否包含關鍵字
- slug 是否適當

### 4. 生成社群媒體文案

```
幫我為專案 #5 生成 Instagram 和 Facebook 的貼文文案
```

---

## 🐛 常見問題

### Q1: 為什麼 AI 沒有自動觸發？

**A:** 確保：
- `.cursorrules` 檔案存在於專案根目錄
- 你使用的關鍵字包含在規則中
- Cursor 已重新載入專案

### Q2: 圖片沒有正確複製？

**A:** 檢查：
- `public/projects/` 目錄是否存在
- 圖片格式是否為 `.jpg` 或 `.png`
- 檔案權限是否正確

### Q3: 部署失敗？

**A:** 確認：
- Git 倉庫已正確設定
- 有推送權限
- Vercel 已連接到正確的倉庫
- 執行 `git status` 檢查是否有衝突

### Q4: AI 生成的文案不理想？

**A:** 你可以：
- 提供更多圖片細節描述
- 明確指出希望的風格（溫暖、專業、可愛等）
- 要求重新生成：「請用更溫暖的語氣重寫」

### Q5: 如何修改現有作品？

**A:** 直接在 Cursor 中說：

```
請幫我修改專案 #3 的描述，改成更優雅的風格
```

---

## 📚 參考資料

### 檔案結構

```
crochet/
├── .cursorrules          # AI 行為規則
├── scripts/
│   ├── add-project.js    # 新增專案腳本
│   ├── finalize-project.js # 完成新增
│   └── deploy.js         # 部署腳本
├── data/
│   └── project.ts        # 專案資料
└── public/
    └── projects/         # 作品圖片
```

### Cursor Skills 設定位置

- **專案規則**: `.cursorrules`
- **全域規則**: Cursor 設定 > Rules for AI

### 有用的 Cursor 快捷鍵

- `Ctrl/Cmd + L`: 開啟 AI Chat
- `Ctrl/Cmd + K`: Inline AI 編輯
- `Ctrl/Cmd + I`: AI Composer

---

## 🎉 開始使用

現在試試看：

1. 在 Cursor AI Chat 中輸入：`我想新增一個新作品`
2. 上傳你的作品照片
3. 讓 AI 引導你完成整個流程！

---

**需要協助？** 直接在 Cursor 中問我任何問題！ 😊

