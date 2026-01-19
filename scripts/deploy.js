#!/usr/bin/env node
/**
 * 部署到 Vercel 的腳本
 * 使用方式: node scripts/deploy.js
 */

const { execSync } = require('child_process');

function deploy() {
  console.log('🚀 開始部署到 Vercel...\n');
  
  try {
    // 檢查是否有未提交的更改
    console.log('📋 檢查 Git 狀態...');
    const status = execSync('git status --porcelain').toString();
    
    if (status) {
      console.log('📝 發現未提交的更改，進行提交...');
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "feat: update crochet projects"', { stdio: 'inherit' });
    } else {
      console.log('✅ 沒有未提交的更改');
    }
    
    // 推送到遠端
    console.log('\n📤 推送到 GitHub...');
    execSync('git push origin uat', { stdio: 'inherit' });
    
    console.log('\n✅ 部署成功！');
    console.log('🔗 Vercel 會自動檢測並部署');
    console.log('🔗 查看部署狀態: https://vercel.com/dashboard');
    
  } catch (error) {
    console.error('\n❌ 部署失敗:', error.message);
    console.log('\n💡 請檢查：');
    console.log('   1. Git 是否已初始化');
    console.log('   2. 是否已設定遠端倉庫');
    console.log('   3. 是否有推送權限');
    console.log('   4. Vercel 是否已連接此倉庫');
  }
}

if (require.main === module) {
  deploy();
}

module.exports = deploy;

