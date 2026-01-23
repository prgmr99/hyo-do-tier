import { GoogleGenerativeAI } from '@google/generative-ai';
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function listAvailableModels() {
  try {
    console.log('🔍 사용 가능한 Gemini 모델 목록 조회 중...\n');
    
    // API로 모델 목록 조회
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    
    const data = await response.json() as any;
    
    if (data.models) {
      console.log('✅ 사용 가능한 모델:');
      data.models.forEach((model: any) => {
        if (model.supportedGenerationMethods?.includes('generateContent')) {
          console.log(`  - ${model.name.replace('models/', '')}`);
          console.log(`    설명: ${model.displayName || model.description || 'N/A'}`);
        }
      });
    } else {
      console.error('모델 목록을 가져올 수 없습니다:', data);
    }
    
  } catch (error) {
    console.error('에러:', error);
  }
}

listAvailableModels();
