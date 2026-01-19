#!/usr/bin/env node
/**
 * 完成專案新增的腳本
 * 使用方式: node scripts/finalize-project.js <projectId> '<AI 生成的 JSON>'
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProjectFinalizer {
  constructor() {
    this.projectsFile = path.join(__dirname, '../data/project.ts');
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[\s]+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  addProject(projectId, aiData) {
    // 讀取現有內容
    let content = fs.readFileSync(this.projectsFile, 'utf-8');

    // 準備新專案資料
    const slug = this.generateSlug(aiData.title['zh-TW']);
    const imagePaths = [
      `/projects/project-${projectId}_1.jpg`,
      `/projects/project-${projectId}_2.jpg`
    ];

    const newProject = {
      id: projectId,
      slug: slug,
      title: aiData.title,
      category: aiData.category,
      materials: aiData.materials,
      timeSpent: aiData.timeSpent,
      description: aiData.description,
      coverImage: imagePaths[0],
      images: imagePaths,
      colorPalette: aiData.colorPalette
    };

    // 格式化新專案
    const projectStr = JSON.stringify(newProject, null, 2)
      .split('\n')
      .map(line => '  ' + line)
      .join('\n');

    // 在陣列結尾前插入
    content = content.replace(/(\n];)$/, `,\n${projectStr}$1`);

    // 寫回檔案
    fs.writeFileSync(this.projectsFile, content);
    console.log('✅ 專案已新增到 data/project.ts');

    // 顯示預覽
    console.log('\n📦 新專案資訊：');
    console.log(`   ID: ${projectId}`);
    console.log(`   標題: ${aiData.title['zh-TW']}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   配色: ${aiData.colorPalette.join(', ')}`);
  }

  async deployToVercel() {
    console.log('\n🚀 準備部署到 Vercel...');
    
    try {
      // Git 操作
      console.log('📝 Git commit...');
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "feat: add new crochet project"', { stdio: 'inherit' });
      
      console.log('📤 Git push...');
      execSync('git push origin uat', { stdio: 'inherit' });
      
      console.log('\n✅ 已推送到 GitHub，Vercel 將自動部署');
      console.log('🔗 查看部署狀態: https://vercel.com/dashboard');
    } catch (error) {
      console.error('❌ 部署失敗:', error.message);
      console.log('\n💡 請手動執行：');
      console.log('   git add .');
      console.log('   git commit -m "feat: add new crochet project"');
      console.log('   git push origin uat');
    }
  }

  async run(projectId, aiDataString) {
    try {
      const aiData = JSON.parse(aiDataString);
      
      console.log('🎨 完成專案新增...\n');
      
      // 新增專案
      this.addProject(parseInt(projectId), aiData);
      
      // 詢問是否部署
      console.log('\n❓ 是否要立即部署到 Vercel？ (y/n)');
      console.log('   或手動執行: node scripts/deploy.js');
      
      // 在實際使用時，可以用 readline 等待輸入
      // 這裡簡化為直接提示
    } catch (error) {
      console.error('❌ 錯誤:', error.message);
      console.log('\n請確保 JSON 格式正確');
    }
  }
}

// 執行
if (require.main === module) {
  const [, , projectId, aiDataString] = process.argv;
  
  if (!projectId || !aiDataString) {
    console.error('使用方式: node scripts/finalize-project.js <projectId> \'<AI JSON>\'');
    process.exit(1);
  }
  
  const finalizer = new ProjectFinalizer();
  finalizer.run(projectId, aiDataString).catch(console.error);
}

module.exports = ProjectFinalizer;

