# 🎯 Cursor Skills 正確設定指南

## 📍 Cursor 的三種配置方式

### 1. **Cursor Skills** ⭐ (推薦)
- **位置**: Cursor Settings > Features > Skills
- **格式**: JSON 配置
- **用途**: 定義可重複使用的自動化工作流程

### 2. **.cursorrules**
- **位置**: 專案根目錄 `.cursorrules` 檔案
- **格式**: 純文字描述
- **用途**: 專案背景、編碼風格、AI 行為規則

### 3. **MCP (Model Context Protocol)**
- **位置**: Cursor Settings > Features > MCP
- **格式**: JSON 配置（伺服器設定）
- **用途**: 整合外部工具和服務

---

## ⚙️ 設定步驟

### 步驟 1: 在 Cursor 中啟用 Skills

1. **打開 Cursor 設定**
   - Mac: `Cmd + ,`
   - Windows: `Ctrl + ,`

2. **前往 Features**
   - 左側選單點擊 **"Features"**

3. **啟用 Skills**
   - 找到 **"Skills"** 選項
   - 確認已啟用

### 步驟 2: 新增 Skills 配置

有兩種方式：

#### 方式 A: 透過 Cursor UI（推薦）

1. 在 Cursor Settings > Skills 中點擊 **"Add Skill"**

2. 複製以下內容到對應的 Skill：

**Skill 1: 新增勾針作品**
```json
{
  "name": "add-crochet-project",
  "description": "分析勾針作品圖片並新增到網站",
  "prompt": "當用戶上傳勾針作品圖片並說「新增作品」或「add project」時：\n\n1. 使用 AI Vision 分析圖片：\n   - 識別作品類型（髮帶/耳機包/杯墊/袖套等）\n   - 提取主要配色並轉換為 Hex codes\n   - 判斷編織技法（蕾絲/祖母方格/立體編織等）\n   - 觀察材質和風格\n\n2. 生成多語言文案：\n   - 繁體中文：溫暖、細膩、富有情感（使用「溫柔」「舒心」「療癒」等詞彙）\n   - 英文：簡潔優雅（強調 handcrafted, cozy, delicate）\n   - 日文：柔和可愛（使用「優しい」「可愛い」「心地よい」等）\n\n3. 生成完整專案資料（JSON格式）：\n   {\n     \"id\": [自動遞增],\n     \"slug\": [根據繁中標題生成],\n     \"title\": { \"zh-TW\": \"\", \"en\": \"\", \"ja\": \"\" },\n     \"category\": { \"zh-TW\": \"\", \"en\": \"\", \"ja\": \"\" },\n     \"materials\": { \"zh-TW\": \"四股棉線、Xmm 勾針\", \"en\": \"\", \"ja\": \"\" },\n     \"timeSpent\": { \"zh-TW\": \"約 X 小時\", \"en\": \"\", \"ja\": \"\" },\n     \"description\": { \"zh-TW\": \"[50-100字]\", \"en\": \"[30-60 words]\", \"ja\": \"[40-80字]\" },\n     \"coverImage\": \"/projects/project-{id}_1.jpg\",\n     \"images\": [\"/projects/project-{id}_1.jpg\", \"/projects/project-{id}_2.jpg\"],\n     \"colorPalette\": [\"#HEX1\", \"#HEX2\", ...]\n   }\n\n4. 更新檔案：\n   - 讀取 data/project.ts\n   - 取得下一個 ID（目前最大 ID + 1）\n   - 在 projects 陣列末尾新增專案\n   - 儲存檔案\n\n5. 處理圖片：\n   - 複製上傳的圖片到 public/projects/\n   - 重命名為 project-{id}_1.jpg, project-{id}_2.jpg\n\n6. 詢問是否部署到 Vercel",
  "examples": [
    "我有個新的勾針作品（上傳圖片）",
    "請幫我分析這個作品並新增到網站",
    "新增勾針作品"
  ]
}
```

**Skill 2: 優化文案**
```json
{
  "name": "optimize-crochet-description",
  "description": "優化勾針作品的文案描述",
  "prompt": "當用戶說「優化文案」或「優化專案 #N」時：\n\n1. 讀取 data/project.ts 中指定專案的資料\n\n2. 分析現有描述：\n   - 確認基本資訊是否完整\n   - 評估情感表達程度\n   - 檢查三語風格一致性\n\n3. 根據風格要求重寫（保持事實準確）：\n   \n   **溫暖風格**（預設）：\n   - 繁中：使用「溫柔」「舒心」「療癒」「陪伴」，描繪使用情境和感受\n   - 英文：使用 cozy, comforting, heartwarming\n   - 日文：使用「優しい」「心地よい」「癒し」\n   \n   **優雅風格**：\n   - 繁中：使用「細膩」「雅緻」「品味」「精緻」，強調工藝和質感\n   - 英文：使用 elegant, refined, exquisite\n   - 日文：使用「上品」「繊細」「優雅」\n   \n   **活潑風格**：\n   - 繁中：使用「可愛」「俏皮」「繽紛」「活力」\n   - 英文：使用 playful, vibrant, cheerful\n   - 日文：使用「可愛い」「元気」「楽しい」\n\n4. 顯示修改前後對比\n\n5. 詢問是否套用並部署",
  "examples": [
    "優化專案 #3 的描述",
    "幫我把專案 #5 的文案改得更溫暖",
    "重寫所有作品的英文描述，要更優雅"
  ]
}
```

**Skill 3: 部署到 Vercel**
```json
{
  "name": "deploy-to-vercel",
  "description": "自動部署到 Vercel",
  "prompt": "當用戶說「部署」或「deploy」時：\n\n1. 檢查 Git 狀態：\n   - 執行 git status\n   - 列出將要提交的檔案\n\n2. 顯示更改摘要並詢問確認\n\n3. 如果用戶確認，執行：\n   ```bash\n   git add .\n   git commit -m \"feat: update crochet projects\"\n   git push origin uat\n   ```\n\n4. 通知：\n   ✅ 已推送到 GitHub\n   🔗 Vercel 會自動偵測並部署\n   🔗 查看狀態: https://vercel.com/dashboard\n\n5. 錯誤處理：\n   - 如果有衝突：提示手動解決\n   - 如果推送失敗：提供診斷建議\n   - 如果沒有更改：通知用戶",
  "examples": [
    "部署到 Vercel",
    "deploy",
    "推送並部署"
  ]
}
```

#### 方式 B: 使用專案內的配置檔案

專案中已有：
```
.cursor/skills/
├── add-crochet-project.json
├── optimize-description.json
└── deploy-to-vercel.json
```

在 Cursor Settings > Skills 中，點擊 **"Import from file"** 並選擇這些檔案。

---

## 🎯 驗證 Skills 是否生效

### 測試方法：

1. **開啟 Cursor AI Chat** (`Cmd/Ctrl + L`)

2. **輸入觸發詞**:
   ```
   我想新增一個勾針作品
   ```

3. **如果 Skills 已啟用**，AI 會：
   - 自動啟動「新增勾針作品」流程
   - 要求你上傳圖片
   - 按照預設步驟執行

4. **如果 Skills 未啟用**，AI 會：
   - 只是一般性回應
   - 不會有結構化的工作流程

---

## 🔄 Skills vs .cursorrules 的搭配使用

兩者可以同時使用，分工如下：

### **.cursorrules** 負責：
- ✅ 告訴 AI 專案背景和脈絡
- ✅ 定義編碼風格和慣例
- ✅ 說明檔案結構
- ✅ 一般性的行為規則

### **Cursor Skills** 負責：
- ⭐ 定義具體的自動化工作流程
- ⭐ 結構化的多步驟任務
- ⭐ 可重複使用的操作範本
- ⭐ 精確的輸入輸出格式

---

## 📝 最佳實踐

### 1. Skills 命名規範
```json
{
  "name": "動詞-目標-專案名",
  "description": "清楚描述做什麼",
  "examples": ["具體的觸發範例"]
}
```

### 2. Prompt 撰寫技巧
- 使用明確的步驟編號（1, 2, 3...）
- 提供具體的格式範例
- 包含錯誤處理邏輯
- 說明預期的輸入和輸出

### 3. 觸發詞設計
- 使用自然語言
- 支援中英文
- 包含常見變體

---

## 🚨 如果 Cursor 還沒有 Skills 功能怎麼辦？

Cursor 的 Skills 功能可能還在 Beta 或特定版本才有。

### 替代方案：使用 `.cursorrules` + AI Composer

1. **.cursorrules** 已經包含了所有規則
2. 在 AI Chat 中直接對話，AI 會遵循規則
3. 使用 AI Composer (`Cmd/Ctrl + I`) 進行多檔案編輯

### 驗證 Cursor 版本

```bash
# 查看 Cursor 版本
Help > About Cursor
```

如果版本 >= 0.40，應該有 Skills 功能。

---

## 🎯 快速開始（無論有無 Skills）

### 有 Skills 功能：
```
1. 按照上面步驟設定 Skills
2. 在 Chat 中說「新增作品」
3. 上傳圖片
4. AI 自動執行流程
```

### 沒有 Skills 功能：
```
1. 確保 .cursorrules 檔案存在
2. 在 Chat 中上傳圖片並說：
   「請幫我分析這個勾針作品並新增到網站，
    參考 .cursorrules 中的流程」
3. AI 會遵循規則執行
```

---

## ❓ 常見問題

### Q: 找不到 Skills 設定？
A: 確認 Cursor 版本，或使用 `.cursorrules` 替代方案

### Q: Skills 沒有觸發？
A: 檢查觸發詞是否正確，或直接描述想做的事情

### Q: 可以同時用 Skills 和 .cursorrules 嗎？
A: 可以！它們會互相配合

---

## 📚 相關資源

- [Cursor 官方文檔](https://cursor.sh/docs)
- [Cursor Skills Beta 說明](https://cursor.sh/features/skills)
- `.cursorrules` 語法參考

---

**下一步**：試試看在 Cursor 中輸入「我想新增一個勾針作品」！

