# FinBrief 이메일 기능 설정 가이드

이메일 구독자들에게 매일 오전 8시(KST)에 AI 요약 브리핑을 전송하기 위한 설정 가이드입니다.

## 필수 GitHub Secrets 추가

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 secrets를 추가해야 합니다:

### 1. Resend (이메일 발송 서비스)

- `RESEND_API_KEY`: Resend API 키
  - [Resend Dashboard](https://resend.com/api-keys)에서 발급
  - 예: `re_123456789abcdefghijklmnop`

- `RESEND_FROM_EMAIL`: 발신 이메일 주소
  - Resend에서 인증된 도메인의 이메일 주소
  - 예: `noreply@finbrief.com` 또는 `briefing@yourdomain.com`

### 2. Supabase (구독자 데이터베이스)

- `SUPABASE_URL`: Supabase 프로젝트 URL
  - Project Settings > API > Project URL
  - 예: `https://your-project.supabase.co`

- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key
  - Project Settings > API > Service Role Key (secret)
  - ⚠️ 주의: anon key가 아닌 service_role key를 사용해야 합니다

### 3. 앱 URL (선택 사항)

- `NEXT_PUBLIC_BASE_URL`: 앱 베이스 URL (구독 취소 링크에 사용)
  - 예: `https://finbrief.vercel.app`
  - 설정하지 않으면 기본값 사용

## 기존 Secrets (이미 설정되어 있어야 함)

다음 secrets는 Telegram 발송을 위해 이미 설정되어 있어야 합니다:

- `GEMINI_API_KEY`: Gemini AI API 키
- `TELEGRAM_BOT_TOKEN`: Telegram 봇 토큰
- `TELEGRAM_CHAT_ID`: Telegram 채팅 ID

## 설정 확인

### 1. GitHub Actions Workflow

`.github/workflows/daily-briefing.yml` 파일에 다음 환경 변수가 포함되어 있는지 확인:

```yaml
env:
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
  TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
  RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
  RESEND_FROM_EMAIL: ${{ secrets.RESEND_FROM_EMAIL }}
  SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
  NEXT_PUBLIC_BASE_URL: ${{ secrets.NEXT_PUBLIC_BASE_URL }}
```

### 2. 로컬 테스트

로컬에서 이메일 발송 기능을 테스트하려면 `finbrief/.env` 파일에 동일한 환경 변수를 추가하세요:

```bash
# AI
GEMINI_API_KEY=your_gemini_api_key

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Database (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App URL
NEXT_PUBLIC_BASE_URL=https://finbrief.vercel.app
```

### 3. 이메일 발송 테스트

```bash
cd finbrief
npm install
npm run send-briefing
```

성공적으로 실행되면 다음과 같은 로그가 출력됩니다:

```
📧 이메일 발송 준비 중...
📬 N명의 구독자에게 이메일 발송 중...
✅ 이메일 발송 완료: N개 성공, 0개 실패
```

## 구독자 데이터베이스 구조

Supabase의 `subscribers` 테이블은 다음 구조를 가져야 합니다:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| id | uuid | 기본 키 |
| email | text | 구독자 이메일 |
| is_active | boolean | 구독 활성 상태 |
| unsubscribe_token | text | 구독 취소 토큰 |
| created_at | timestamp | 생성 시각 |
| updated_at | timestamp | 수정 시각 |
| welcome_email_sent | boolean | 환영 이메일 발송 여부 |

## 동작 방식

1. **오전 8시(KST) GitHub Actions 자동 실행**
   - RSS 뉴스 수집
   - Gemini AI 분석
   - Telegram 발송 (기존)
   - **이메일 발송 (신규)**
     - Supabase에서 `is_active = true`인 구독자 조회
     - 각 구독자에게 HTML 이메일 발송
     - 발송 결과를 JSON 파일에 기록

2. **이메일 내용**
   - 오늘의 주요 뉴스 3개 (AI 요약)
   - 각 뉴스의 중요도 및 이유
   - 오늘의 키워드
   - 시장 분위기 요약
   - 맥락 기반 제휴 링크
   - 구독 취소 링크

## 문제 해결

### 이메일이 발송되지 않는 경우

1. **GitHub Actions 로그 확인**
   - Actions 탭에서 최근 실행 로그 확인
   - 에러 메시지 확인

2. **환경 변수 확인**
   - 모든 secrets가 올바르게 설정되어 있는지 확인
   - Supabase URL과 Service Role Key가 정확한지 확인

3. **구독자 데이터 확인**
   - Supabase에서 `SELECT * FROM subscribers WHERE is_active = true` 쿼리 실행
   - 활성 구독자가 존재하는지 확인

4. **Resend 할당량 확인**
   - Resend 대시보드에서 API 할당량 확인
   - 발송 로그 확인

### 구독자가 이메일을 받지 못하는 경우

1. **스팸 폴더 확인**
2. **이메일 주소 정확성 확인**
3. **Resend 도메인 인증 확인**
4. **이메일 발송 로그에서 성공/실패 여부 확인**

## 추가 정보

- Resend 문서: https://resend.com/docs
- Supabase 문서: https://supabase.com/docs
- GitHub Actions 문서: https://docs.github.com/actions
