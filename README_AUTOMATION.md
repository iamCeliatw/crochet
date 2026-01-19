# 🤖 Crochet 作品自動化系統

> 使用 Cursor AI + Skills + MCP 實現智能管理勾針作品網站

## 🎯 功能總覽

✅ **AI 圖片分析** - 自動識別作品類型、配色、風格
✅ **多語言文案生成** - 自動生成繁中、英文、日文描述
✅ **自動化部署** - 一鍵更新並部署到 Vercel
✅ **智能優化** - AI 協助優化現有文案
✅ **批次處理** - 同時處理多個作品

---

## 🚀 快速開始（3 分鐘）

### 1. 在 Cursor AI Chat 中上傳作品圖片

<img src="https://img.shields.io/badge/Step_1-上傳圖片-blue?style=for-the-badge" />

點擊 📎 選擇 1-2 張作品照片

### 2. 輸入指令

<img src="https://img.shields.io/badge/Step_2-請求分析-green?style=for-the-badge" />

```
請幫我分析這個勾針作品並新增到網站
```

### 3. 確認並部署

<img src="https://img.shields.io/badge/Step_3-自動部署-orange?style=for-the-badge" />

```
好的，請新增並部署到 Vercel
```

### ✅ 完成！

你的作品已上線 🎉

---

## 📁 系統架構

```
crochet/
├── 📄 .cursorrules                    # AI 行為規則（核心）
├── 📄 AUTOMATION_GUIDE.md             # 完整使用指南
├── 📄 QUICKSTART.md                   # 快速開始
├── 📄 README_AUTOMATION.md            # 本文件
│
├── 📂 scripts/                        # 自動化腳本
│   ├── add-project.js                # 新增作品
│   ├── finalize-project.js           # 完成新增
│   └── deploy.js                     # 部署腳本
│
├── 📂 prompts/                        # 提示詞模板
│   └── add-project-template.md       # 各種情境模板
│
├── 📂 data/
│   └── project.ts                    # 作品資料（會被自動更新）
│
└── 📂 public/projects/                # 作品圖片（自動管理）
```

---

## 🎨 Cursor Skills 已設定

系統已配置以下 AI Skills（定義在 `.cursorrules`）：

### Skill 1: 新增勾針作品 ⭐
**觸發**: `新增作品`, `add project`, 上傳圖片時

**流程**:
1. AI 分析圖片（類型、配色、風格）
2. 生成多語言文案
3. 更新 `data/project.ts`
4. 複製圖片到正確位置
5. 準備部署

### Skill 2: 優化文案 📝
**觸發**: `優化文案`, `improve description`

**流程**:
1. 分析現有描述
2. 提供更有溫度的版本
3. 保持三語一致性
4. 可選擇性套用

### Skill 3: 自動部署 🚀
**觸發**: `部署`, `deploy`

**流程**:
1. Git commit
2. Push 到 GitHub
3. Vercel 自動部署
4. 回報狀態

---

## 💬 實用對話範例

### 範例 1: 新增作品

```
👤 你: 我有個新的蕾絲髮帶作品
     （上傳 2 張圖片）

🤖 AI: 我看到了！這是一個精緻的蕾絲髮帶。
     讓我分析一下...
     
     主要配色：淡紫色 (#E6D5E8) 和白色 (#FFFFFF)
     編織技法：蕾絲花紋
     
     建議內容：
     
     標題：
     • 繁中: 優雅蕾絲髮帶
     • 英文: Elegant Lace Hairband
     • 日文: エレガントレースヘアバンド
     
     描述：
     • 繁中: 繁複的蕾絲花紋，每一針都是耐心與溫柔的...
     ...
     
     要我新增到網站嗎？

👤 你: 好的，請新增並部署

🤖 AI: 正在處理...
     
     ✅ 圖片已複製到 public/projects/
     ✅ 已更新 data/project.ts（專案 #7）
     ✅ Git: feat: add elegant lace hairband
     ✅ 已推送到 GitHub
     ✅ Vercel 部署已觸發
     
     🎉 完成！預計 1-2 分鐘後上線
```

### 範例 2: 優化現有作品

```
👤 你: 專案 #3 的描述可以更溫暖一點嗎？

🤖 AI: 好的！讓我看看專案 #3...
     
     【原始描述】
     立體花朵造型髮帶，粉紫與灰藍的溫柔配色...
     
     【優化後】
     每一朵立體小花都像是春天的私語，粉紫與灰藍交織
     出最溫柔的午後時光。戴上它，就像被柔軟的雲朵
     輕輕擁抱...
     
     要套用這個版本嗎？

👤 你: 完美！請套用並部署

🤖 AI: ✅ 已更新並部署
```

### 範例 3: 批次處理

```
👤 你: 我有 3 個新作品，我會依序上傳

🤖 AI: 好的！我會幫你處理全部 3 個作品。
     請逐一上傳圖片並說明。
     
     目前進度：0/3

👤 你: 第一個是貓咪杯墊（上傳圖片）

🤖 AI: ✅ 專案 #7: 貓咪杯墊已準備
     
     請上傳第二個作品
     進度：1/3

...（重複）

🤖 AI: 全部 3 個作品都準備好了！
     
     要我一次性部署嗎？
```

---

## 🔧 MCP 配置說明

### 什麼是 MCP？

**Model Context Protocol** 是 Cursor 的擴展協議，讓 AI 能夠：
- 直接操作檔案系統
- 執行命令
- 整合外部工具

### 本專案的 MCP 設定

✅ **已啟用功能**:
- 檔案讀寫（自動更新 `project.ts`）
- 圖片處理（複製、重命名）
- Git 操作（commit、push）
- AI Vision（圖片分析）

✅ **配置檔案**:
- `.cursorrules` - AI 行為規則
- `scripts/*.js` - 自動化腳本

### 無需額外設定

Cursor 會自動讀取 `.cursorrules` 並啟用相關功能。

---

## 📖 詳細文檔

- 📘 [完整自動化指南](./AUTOMATION_GUIDE.md) - 詳細功能說明
- 📗 [快速開始](./QUICKSTART.md) - 3 分鐘上手
- 📙 [提示詞模板](./prompts/add-project-template.md) - 各種情境範例

---

## 🎓 學習路徑

### 初學者
1. 閱讀 [QUICKSTART.md](./QUICKSTART.md)
2. 嘗試新增一個作品
3. 練習優化文案

### 進階使用者
1. 閱讀 [AUTOMATION_GUIDE.md](./AUTOMATION_GUIDE.md)
2. 學習批次處理
3. 客製化提示詞

### 開發者
1. 研究 `.cursorrules`
2. 修改 `scripts/*.js`
3. 擴展自動化功能

---

## 💡 最佳實踐

### ✅ 圖片準備

- **格式**: JPG 或 PNG
- **數量**: 2 張（1 封面 + 1 細節）
- **大小**: 單張 < 5MB
- **建議尺寸**: 800x800 - 1200x1200 px

### ✅ 文案風格

- **繁體中文**: 溫暖、細膩、富有情感
- **英文**: 簡潔、優雅、突出 handcrafted
- **日文**: 柔和、可愛、注重細節

### ✅ 部署時機

- 單一作品：立即部署
- 多個作品：批次完成後一次部署
- 文案優化：累積多個後一起部署

---

## 🐛 疑難排解

### 問題 1: AI 沒有自動觸發

**解決方案**:
```bash
# 確認 .cursorrules 存在
ls -la .cursorrules

# 重新載入 Cursor
Ctrl/Cmd + Shift + P → "Reload Window"
```

### 問題 2: 圖片沒有複製

**解決方案**:
```bash
# 確認目錄存在
mkdir -p public/projects

# 檢查權限
ls -la public/
```

### 問題 3: 部署失敗

**解決方案**:
```bash
# 檢查 Git 狀態
git status

# 檢查遠端倉庫
git remote -v

# 手動推送
npm run deploy
```

### 問題 4: AI 生成的文案不滿意

**解決方案**:
在 Cursor Chat 中說：
```
請重新生成，風格更[溫暖/優雅/活潑]一點
```

---

## 🎯 命令速查表

### Cursor AI Chat 指令

| 指令 | 功能 |
|------|------|
| `新增作品` | 開始新增流程 |
| `優化文案 #N` | 優化指定專案 |
| `部署` | 部署到 Vercel |
| `列出所有專案` | 顯示專案清單 |
| `生成社群文案 #N` | 生成 IG/FB 文案 |

### NPM 腳本

| 指令 | 功能 |
|------|------|
| `npm run add-project <圖片路徑>` | 新增專案 |
| `npm run finalize-project <ID> '<JSON>'` | 完成新增 |
| `npm run deploy` | 部署 |

---

## 🌟 進階功能

### 1. 自動色彩提取

AI 會從圖片中提取主要顏色並轉換為 Hex 代碼：

```javascript
colorPalette: ["#F4A896", "#6B9CAF", "#FEFEFE"]
```

### 2. SEO 優化建議

```
請分析所有專案的 SEO 並給建議
```

AI 會檢查：
- 標題長度
- 關鍵字密度
- slug 品質
- 圖片 alt 文字

### 3. 社群媒體文案

```
為專案 #5 生成 Instagram 文案（含 hashtags）
```

AI 會生成：
- 吸引人的開場
- 作品特色描述
- 相關 hashtags
- Call to action

### 4. 統計報表

```
分析作品類型分布並給建議
```

AI 會：
- 統計各類型數量
- 分析配色趨勢
- 建議新作品方向

---

## 🔗 相關資源

- [Cursor 官方文檔](https://cursor.sh/docs)
- [MCP 協議說明](https://modelcontextprotocol.io/)
- [Vercel 部署指南](https://vercel.com/docs)
- [Next.js 文檔](https://nextjs.org/docs)

---

## 🎉 開始使用

1. **開啟 Cursor**
2. **打開 AI Chat** (`Ctrl/Cmd + L`)
3. **輸入**: `我想新增一個新作品`
4. **上傳圖片**
5. **讓 AI 引導你！**

---

## 💬 需要協助？

直接在 Cursor AI Chat 中問我：

```
關於自動化系統，我想知道...
```

或參考：
- [完整指南](./AUTOMATION_GUIDE.md)
- [快速開始](./QUICKSTART.md)
- [提示詞模板](./prompts/add-project-template.md)

---

**製作者**: AI + Human Collaboration  
**更新日期**: 2026-01-19  
**版本**: 1.0.0

---

<div align="center">

### 🎨 讓 AI 成為你的勾針作品管理助手！

[![Made with Cursor](https://img.shields.io/badge/Made%20with-Cursor-blue?style=for-the-badge&logo=cursor)](https://cursor.sh)
[![Powered by AI](https://img.shields.io/badge/Powered%20by-AI-green?style=for-the-badge)](https://openai.com)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

