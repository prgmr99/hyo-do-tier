import { collectAllNews } from './collectors/rss-collector';
import { analyzeNews, formatAnalysisResult } from './analyzers/gemini-analyzer';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 통합 테스트: RSS 수집 + AI 분석
 * 실제 뉴스를 수집하고 AI로 분석하는 전체 파이프라인 테스트
 */

async function runIntegrationTest() {
  console.log('🚀 FinBrief 통합 테스트 시작\n');
  console.log('='.repeat(50));
  
  try {
    // Step 1: 뉴스 수집
    console.log('\n📰 Step 1: 뉴스 수집 중...\n');
    const newsItems = await collectAllNews();
    
    if (newsItems.length === 0) {
      throw new Error('수집된 뉴스가 없습니다.');
    }
    
    // Step 2: AI 분석
    console.log('\n🤖 Step 2: AI 분석 중...\n');
    const analysis = await analyzeNews(newsItems);
    
    // Step 3: 결과 출력
    console.log('\n' + '='.repeat(50));
    console.log(formatAnalysisResult(analysis));
    console.log('='.repeat(50));
    
    // Step 4: JSON 파일로 저장
    const today = new Date().toISOString().split('T')[0];
    const outputPath = path.join(__dirname, '..', 'data', `${today}.json`);
    
    const output = {
      date: today,
      timestamp: new Date().toISOString(),
      newsCount: newsItems.length,
      analysis: analysis,
      rawNews: newsItems.slice(0, 10) // 최대 10개만 저장
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`\n💾 결과 저장: ${outputPath}`);
    
    console.log('\n✅ 통합 테스트 성공!');
    
  } catch (error) {
    console.error('\n❌ 통합 테스트 실패:', error);
    process.exit(1);
  }
}

// 실행
if (require.main === module) {
  // dotenv 로드
  require('dotenv').config();
  
  runIntegrationTest();
}

export { runIntegrationTest };
