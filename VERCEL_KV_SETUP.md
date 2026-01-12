# Vercel KV 設定教學

## 📦 什麼是 Vercel KV？

Vercel KV 是 Vercel 提供的 Redis 資料庫服務：
- ✅ 持久化存儲（不會因為重啟而消失）
- ✅ 免費額度：30,000 次請求/月
- ✅ 超快速（全球 CDN）
- ✅ 零配置

---

## 🚀 設定步驟

### 1. 在 Vercel 建立 KV 資料庫

1. 進入 Vercel Dashboard：https://vercel.com/dashboard
2. 選擇你的專案
3. 點選「**Storage**」分頁
4. 點選「**Create Database**」
5. 選擇「**KV (Redis)**」
6. 輸入資料庫名稱（例如：`crochet-analytics`）
7. 選擇區域（建議選離台灣近的，例如 Singapore）
8. 點選「**Create**」

### 2. 連接到專案

1. 建立完成後，點選「**Connect to Project**」
2. 選擇你的專案
3. 選擇環境（建議全選：Production、Preview、Development）
4. 點選「**Connect**」

Vercel 會自動在你的專案加入環境變數：
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. 本地開發設定

1. 回到專案的 **Settings** → **Environment Variables**
2. 複製這三個變數的值：
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

3. 在專案根目錄的 `.env.local` 加入：

```bash
# Vercel KV
KV_REST_API_URL=你的_URL
KV_REST_API_TOKEN=你的_TOKEN
KV_REST_API_READ_ONLY_TOKEN=你的_READ_ONLY_TOKEN
```

### 4. 重啟開發伺服器

```bash
npm run dev
```

---

## ✅ 測試

1. 打開網站首頁（會記錄一次 page view）
2. 點擊任一作品（會記錄 project view）
3. 打開 `/admin/analytics` 查看數據
4. 重啟伺服器，數據依然存在！

---

## 💰 免費額度

**免費方案：**
- 30,000 次請求/月
- 256 MB 資料存儲
- 每日最高 1,000 次

**預估用量：**
- 每位訪客約 1-3 次請求
- 約可支援 10,000 位訪客/月
- 對初期綽綽有餘！

---

## 🔧 進階功能

### 查看資料庫內容

在 Vercel Dashboard → Storage → 你的 KV 資料庫 → Data Browser

可以看到所有 key-value 資料：
```
analytics:page_views → 123
analytics:project_views:1 → 45
analytics:project_views:2 → 67
analytics:order_submissions → 8
```

### 清空資料（重置統計）

在 Data Browser 可以手動刪除 key，或用 Vercel CLI：

```bash
vercel env pull .env.local
```

---

## 🚨 注意事項

1. **本地開發**需要設定 `.env.local`
2. **部署到 Vercel** 會自動使用環境變數
3. 資料是**全球共享**的（Production 環境）
4. 免費額度用完後，請求會失敗（建議升級或加快取）

---

## 📊 監控用量

Vercel Dashboard → Storage → 你的 KV → Usage

可以看到：
- 請求次數
- 資料大小
- 還剩多少額度

