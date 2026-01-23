import { GoogleGenerativeAI } from '@google/generative-ai';
import { NewsItem, AnalysisResult } from '../types/news.types';

/**
 * AI 뉴스 분석기 (Google Gemini)
 * 수집된 뉴스를 분석하여 핵심 인사이트를 추출합니다.
 */

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * 뉴스 목록을 AI로 분석
 * 
 * @param newsItems 분석할 뉴스 아이템 배열
 * @returns 분석 결과 (상위 3개 뉴스, 키워드, 시장 분위기)
 */
export async function analyzeNews(newsItems: NewsItem[]): Promise<AnalysisResult> {
  try {
    console.log('🤖 AI 분석 시작...');
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
    
    // Gemini 2.5 Flash 모델 사용 (무료 티어, 빠르고 정확)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // 프롬프트 생성
    const prompt = generateAnalysisPrompt(newsItems);
    
    // AI 분석 요청
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log('📝 AI 응답 받음');
    
    // JSON 파싱 (마크다운 코드 블록 제거)
    const analysisResult = parseAIResponse(response);
    
    console.log(`✅ 분석 완료: ${analysisResult.topNews.length}개 주요 뉴스 선정`);
    
    return analysisResult;
    
  } catch (error) {
    console.error('❌ AI 분석 실패:', error);
    throw error;
  }
}

/**
 * AI 분석용 프롬프트 생성
 */
function generateAnalysisPrompt(newsItems: NewsItem[]): string {
  const newsList = newsItems
    .map((item, idx) => `${idx + 1}. ${item.title}`)
    .join('\n');
  
  return `
당신은 20년 경력의 펀드매니저이자 금융 전문가입니다.
독자는 바쁜 직장인으로, 30초 만에 핵심만 파악해야 합니다.

**임무:**
다음 뉴스 목록에서 **가장 중요한 3개**만 선정하고, 각각에 대해 분석하세요.

**뉴스 목록:**
${newsList}

**분석 기준:**
1. 투자 결정에 영향을 줄 수 있는 뉴스 우선
2. 시의성과 파급력이 큰 뉴스
3. 일반적인 홍보성 기사 제외

**출력 형식:** 
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.

{
  "topNews": [
    {
      "title": "선정된 뉴스 제목",
      "summary": "초등학생도 이해할 수 있는 3줄 요약 (각 줄은 한 문장, 총 3문장)",
      "sentiment": "bull 또는 bear 또는 neutral 중 하나",
      "reason": "왜 이 뉴스가 중요한지 한 문장"
    }
  ],
  "keywords": ["#키워드1", "#키워드2", "#키워드3"],
  "marketSentiment": "전체 시장 분위기를 한 줄로 요약"
}

**주의사항:**
- summary는 정확히 3개 문장으로 작성
- sentiment는 "bull"(상승 요인), "bear"(하락 요인), "neutral"(중립) 중 하나만 선택
- keywords는 오늘의 핵심 투자 키워드 3개 (# 포함)
- JSON 형식만 출력, 추가 설명 금지
`;
}

/**
 * AI 응답을 파싱하여 AnalysisResult 객체로 변환
 */
function parseAIResponse(response: string): AnalysisResult {
  try {
    // JSON 코드 블록 제거 (```json ... ``` 형태)
    let jsonText = response.trim();
    
    const jsonMatch = jsonText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    } else {
      // 코드 블록이 없으면 중괄호 사이 내용 추출
      const bracketMatch = jsonText.match(/{[\s\S]*}/);
      if (bracketMatch) {
        jsonText = bracketMatch[0];
      }
    }
    
    const parsed = JSON.parse(jsonText);
    
    // 유효성 검증
    if (!parsed.topNews || !Array.isArray(parsed.topNews)) {
      throw new Error('topNews가 배열이 아닙니다.');
    }
    
    if (!parsed.keywords || !Array.isArray(parsed.keywords)) {
      throw new Error('keywords가 배열이 아닙니다.');
    }
    
    return parsed as AnalysisResult;
    
  } catch (error) {
    console.error('AI 응답 파싱 실패:', error);
    console.error('원본 응답:', response);
    
    // 파싱 실패 시 기본값 반환
    return {
      topNews: [
        {
          title: '분석 오류',
          summary: 'AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          sentiment: 'neutral',
          reason: '시스템 오류'
        }
      ],
      keywords: ['#재테크', '#투자', '#뉴스'],
      marketSentiment: '분석 결과를 가져올 수 없습니다.'
    };
  }
}

/**
 * 분석 결과를 사람이 읽기 좋은 형태로 포맷팅
 */
export function formatAnalysisResult(analysis: AnalysisResult): string {
  let output = '\n=== AI 분석 결과 ===\n\n';
  
  analysis.topNews.forEach((news, idx) => {
    const emoji = news.sentiment === 'bull' ? '🐂' : news.sentiment === 'bear' ? '🐻' : '😐';
    output += `${idx + 1}. ${news.title} ${emoji}\n`;
    output += `   요약: ${news.summary}\n`;
    output += `   💡 중요한 이유: ${news.reason}\n\n`;
  });
  
  output += `🔑 오늘의 키워드: ${analysis.keywords.join(' ')}\n`;
  output += `📈 시장 분위기: ${analysis.marketSentiment}\n`;
  
  return output;
}

// 테스트 실행 (이 파일을 직접 실행할 때)
if (require.main === module) {
  // 테스트용 더미 데이터
  const dummyNews: NewsItem[] = [
    {
      title: '한국은행, 기준금리 동결 결정',
      link: 'https://example.com/1',
      pubDate: new Date().toISOString(),
      source: 'Test'
    },
    {
      title: '삼성전자, 반도체 수출 증가세',
      link: 'https://example.com/2',
      pubDate: new Date().toISOString(),
      source: 'Test'
    },
    {
      title: '비트코인 가격 급등, 5천만원 돌파',
      link: 'https://example.com/3',
      pubDate: new Date().toISOString(),
      source: 'Test'
    }
  ];
  
  analyzeNews(dummyNews).then(result => {
    console.log(formatAnalysisResult(result));
  }).catch(error => {
    console.error('테스트 실패:', error);
    process.exit(1);
  });
}
