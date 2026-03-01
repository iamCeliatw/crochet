---
name: deploy-vercel
description: 將網站更新部署到 Vercel。當用戶說「部署」或「deploy」時使用。
---

# 部署到 Vercel

自動執行 Git commit 和 push，觸發 Vercel 自動部署。

## When to Use

- 當用戶說「部署」、「deploy」、「發布」時
- 當用戶說「推送到 GitHub」、「push」時
- 當完成新增作品或優化文案後，用戶確認要部署時
- 當用戶說「上線」時

## Instructions

### 步驟 1: 檢查 Git 狀態

執行以下檢查：

```bash
git status
```

確認：
- ✅ 是否有未提交的更改
- ✅ 當前分支是否為 main
- ✅ 是否有衝突需要解決

### 步驟 2: 顯示更改摘要

列出將要提交的檔案：

```
📦 將要提交的更改：

修改的檔案：
  • data/project.ts (+25 行)

新增的檔案：
  • public/projects/project-7_1.jpg
  • public/projects/project-7_2.jpg

確認要繼續部署嗎？
```

### 步驟 3: 詢問確認

等待用戶確認後才執行。

如果用戶確認，繼續下一步。

### 步驟 4: 執行 Git 操作

```bash
# 加入所有更改
git add .

# 提交（根據更改內容自動生成訊息）
git commit -m "feat: [自動生成的描述]"

# 推送到遠端
git push origin uat
```

**Commit 訊息格式**：
- 新增作品：`feat: add [作品名稱] project`
- 優化文案：`docs: improve project descriptions`
- 多項更新：`feat: update crochet projects`

### 步驟 5: 自動建立 PR 到 main

```bash
# 建立從 uat 到 main 的 PR（如果已存在則顯示既有 PR）
gh pr create --base main --head uat --title "chore: sync uat to main" --body "Auto-created by deploy skill"
```

執行前檢查：
- ✅ 已安裝並登入 GitHub CLI（`gh auth status`）
- ✅ `uat` 分支已成功 push 到遠端
- ✅ 沒有既有的 `uat -> main` 開啟中 PR（若有，改為回報 PR 連結）

### 步驟 6: 回報結果

**成功時**：
```
✅ 部署成功！

📝 Commit: feat: add elegant lace hairband project
📤 已推送到 GitHub (uat branch)
🔀 已自動建立 PR: uat → main
🚀 Vercel 已收到更新，正在部署...

🔗 查看部署狀態: https://vercel.com/dashboard
🔗 PR 連結: https://github.com/[owner]/[repo]/pull/[number]
🔗 網站將在 1-2 分鐘後更新
```

**失敗時**：
```
❌ 部署失敗

原因：[錯誤訊息]

💡 建議：
1. 檢查網路連線
2. 確認 Git 設定正確
3. 手動執行以下命令：
   git add .
   git commit -m "feat: update"
   git push origin uat
```

## 錯誤處理

### 情況 1: 沒有更改需要提交

```
ℹ️ 沒有需要部署的更改

目前所有檔案都已是最新狀態。
```

### 情況 2: Git 衝突

```
⚠️ 發現 Git 衝突

衝突檔案：
  • data/project.ts

請先手動解決衝突後再部署：
1. 執行 git status 查看衝突
2. 手動編輯衝突檔案
3. 執行 git add .
4. 再次說「部署」
```

### 情況 3: 推送失敗

```
❌ 推送失敗

可能原因：
1. 遠端有新的更改，請先執行 git pull
2. 沒有推送權限
3. 網路問題

嘗試手動執行：
git pull origin main
git push origin uat
```

### 情況 4: 自動建立 PR 失敗

```
⚠️ 已完成 push，但建立 PR 失敗

可能原因：
1. 尚未安裝或登入 GitHub CLI（gh）
2. 已存在相同 base/head 的開啟中 PR
3. 權限不足（無法建立 PR）

可手動執行：
gh auth status
gh pr list --base main --head uat
gh pr create --base main --head uat
```

### 情況 5: 未設定遠端倉庫

```
❌ 未設定 Git 遠端倉庫

請先設定：
git remote add origin [你的 GitHub 倉庫 URL]

或確認現有設定：
git remote -v
```

## 安全檢查

在部署前自動檢查：

- ⚠️ 確認 `.env` 等敏感檔案已加入 `.gitignore`
- ⚠️ 確認沒有 API keys 或密碼被提交
- ⚠️ 確認不是在 detached HEAD 狀態

## 範例對話

**用戶**：部署到 Vercel

**AI**：讓我檢查一下目前的更改...

📦 **將要提交的更改**：

| 檔案 | 狀態 | 說明 |
|------|------|------|
| data/project.ts | 修改 | 新增專案 #7 |
| public/projects/project-7_1.jpg | 新增 | 作品封面 |
| public/projects/project-7_2.jpg | 新增 | 作品細節 |

確認要部署嗎？

**用戶**：確認

**AI**：
```
正在部署...

✅ git add . - 完成
✅ git commit -m "feat: add elegant lace hairband project" - 完成
✅ git push origin uat - 完成
✅ gh pr create --base main --head uat - 完成

🎉 部署成功！

Vercel 正在建置中，預計 1-2 分鐘後上線。
PR 已建立： https://github.com/[owner]/[repo]/pull/[number]
🔗 https://vercel.com/dashboard
```

## 快速部署

如果用戶說「直接部署」或「快速部署」：
- 跳過確認步驟
- 直接執行 git add、commit、push、建立 PR
- 回報結果

## 與其他 Skills 的整合

當「新增作品」或「優化文案」完成後，會詢問是否觸發此 Skill 進行部署。

