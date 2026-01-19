#!/usr/bin/env node
/**
 * 新增勾針作品自動化腳本
 * 使用方式: node scripts/add-project.js <圖片路徑1> <圖片路徑2> ...
 * 
 * 此腳本會：
 * 1. 讀取圖片並使用 AI Vision 分析內容
 * 2. 生成多語言文案建議
 * 3. 複製圖片到 public/projects/
 * 4. 更新 data/project.ts
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 顏色方案
const colorNames = {
  red: ['#C41E3A', '#DC143C', '#FF6B6B'],
  pink: ['#F4C5D0', '#FFB6C1', '#FFC0CB'],
  purple: ['#D8BFD8', '#E6D5E8', '#DDA0DD'],
  blue: ['#8FA8B8', '#6B9CAF', '#B4C7D9'],
  green: ['#228B22', '#8FBC8F', '#90EE90'],
  orange: ['#F4A896', '#F58F84', '#FF7F50'],
  brown: ['#A67B5B', '#8B7355', '#D2691E'],
  white: ['#FFFFFF', '#FEFEFE', '#F8F8FF'],
  grey: ['#808080', '#A9A9A9', '#C0C0C0'],
};

class ProjectAdder {
  constructor() {
    this.projectsFile = path.join(__dirname, '../data/project.ts');
    this.publicDir = path.join(__dirname, '../public/projects');
  }

  // 讀取現有專案資料
  readProjects() {
    const content = fs.readFileSync(this.projectsFile, 'utf-8');
    const match = content.match(/export const projects: Project\[\] = (\[[\s\S]*\]);/);
    if (match) {
      // 簡化版解析，實際應該用更穩健的方法
      return content;
    }
    throw new Error('無法解析專案資料');
  }

  // 取得下一個專案 ID
  getNextId() {
    const content = this.readProjects();
    const ids = [...content.matchAll(/id: (\d+)/g)].map(m => parseInt(m[1]));
    return Math.max(...ids) + 1;
  }

  // 生成 slug
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[\s]+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  // AI 生成文案提示模板
  generatePromptTemplate(imageAnalysis) {
    return `
我有一個新的勾針作品，請根據以下資訊生成文案：

作品類型：${imageAnalysis.type || '待分析'}
主要配色：${imageAnalysis.colors?.join(', ') || '待分析'}
風格特點：${imageAnalysis.style || '待分析'}

請提供：
1. 作品名稱（繁中、英文、日文）
2. 分類（繁中、英文、日文）
3. 材質建議（繁中、英文、日文）
4. 製作時間估計（繁中、英文、日文）
5. 詳細描述（繁中、英文、日文）
6. 配色 Hex 代碼陣列

請以 JSON 格式回傳，符合以下結構：
{
  "title": { "zh-TW": "", "en": "", "ja": "" },
  "category": { "zh-TW": "", "en": "", "ja": "" },
  "materials": { "zh-TW": "", "en": "", "ja": "" },
  "timeSpent": { "zh-TW": "", "en": "", "ja": "" },
  "description": { "zh-TW": "", "en": "", "ja": "" },
  "colorPalette": ["#HEXCODE"]
}

風格要求：
- 繁體中文：溫暖、細膩、富有情感，展現手作的溫度
- 英文：簡潔優雅，強調 handcrafted charm
- 日文：可愛柔和，強調細節和舒適感
`;
  }

  // 複製圖片到專案目錄
  copyImages(imagePaths, projectId) {
    const copiedPaths = [];
    imagePaths.forEach((imagePath, index) => {
      const ext = path.extname(imagePath);
      const newFileName = `project-${projectId}_${index + 1}${ext}`;
      const targetPath = path.join(this.publicDir, newFileName);
      
      fs.copyFileSync(imagePath, targetPath);
      copiedPaths.push(`/projects/${newFileName}`);
      console.log(`✅ 已複製: ${newFileName}`);
    });
    return copiedPaths;
  }

  // 新增專案到資料檔案
  addToProjectsFile(projectData) {
    let content = fs.readFileSync(this.projectsFile, 'utf-8');
    
    // 在最後的 ]; 之前插入新專案
    const newProjectStr = `  ${JSON.stringify(projectData, null, 2).replace(/\n/g, '\n  ')},\n];`;
    content = content.replace(/\];$/, newProjectStr);
    
    fs.writeFileSync(this.projectsFile, content);
    console.log('✅ 已更新 data/project.ts');
  }

  // 主要流程
  async run(imagePaths) {
    if (!imagePaths || imagePaths.length === 0) {
      console.error('❌ 請提供至少一張圖片路徑');
      process.exit(1);
    }

    console.log('🎨 開始處理新專案...\n');

    // 1. 取得下一個 ID
    const nextId = this.getNextId();
    console.log(`📋 新專案 ID: ${nextId}`);

    // 2. 複製圖片
    console.log('\n📸 複製圖片中...');
    const imagePaths_copied = this.copyImages(imagePaths, nextId);

    // 3. 顯示 AI 提示
    console.log('\n🤖 請將以下提示詞貼到 Cursor AI Chat：');
    console.log('─'.repeat(60));
    console.log(this.generatePromptTemplate({
      type: '（請在 Cursor 中上傳圖片並讓 AI 分析）',
      colors: [],
      style: ''
    }));
    console.log('─'.repeat(60));

    console.log('\n📝 取得 AI 回應後，請執行：');
    console.log(`   node scripts/finalize-project.js ${nextId} '<AI 回應的 JSON>'`);
  }
}

// 執行腳本
if (require.main === module) {
  const args = process.argv.slice(2);
  const adder = new ProjectAdder();
  adder.run(args).catch(console.error);
}

module.exports = ProjectAdder;

