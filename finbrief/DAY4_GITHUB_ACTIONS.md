# Day 4 - GitHub Actions 자동화 가이드

## 🤖 개요

GitHub Actions를 사용하여 매일 아침 8시에 자동으로 뉴스 브리핑을 발송합니다.

---

## 📋 Step 1: GitHub Secrets 설정

GitHub Repository의 Settings에서 다음 환경 변수를 설정해야 합니다.

### 1-1. GitHub Repository 접속
```
https://github.com/prgmr99/yeomniverse
```

### 1-2. Settings → Secrets and variables → Actions

**"New repository secret" 버튼 클릭 후 다음 3개 추가:**

#### Secret 1: GEMINI_API_KEY
- **Name:** `GEMINI_API_KEY`
- **Secret:** `AIzaSyDL9K2W7Pt2ZbihmggyI6GAWVoaM3LAt5s`

#### Secret 2: TELEGRAM_BOT_TOKEN
- **Name:** `TELEGRAM_BOT_TOKEN`
- **Secret:** `8569370505:AAEyX8IjiYOAxborFCdLrKD5WL37EoRfGTY`

#### Secret 3: TELEGRAM_CHAT_ID
- **Name:** `TELEGRAM_CHAT_ID`
- **Secret:** `5521527062`

---

## ⏰ Step 2: Workflow 스케줄 확인

`.github/workflows/daily-briefing.yml` 파일이 생성되었습니다.

### 실행 시간
- **한국시간:** 매일 오전 8:00
- **UTC 시간:** 매일 23:00 (전날 밤)

### Cron 표현식
```yaml
cron: '0 23 * * *'
```

---

## 🧪 Step 3: 수동 테스트

Secrets 설정 후 바로 테스트할 수 있습니다.

### 방법 1: GitHub UI에서 실행
1. Repository → Actions 탭
2. "Daily FinBrief" workflow 선택
3. "Run workflow" 버튼 클릭
4. 약 1-2분 후 완료

### 방법 2: 로컬에서 확인
```bash
cd finbrief
npm run send-briefing
```

---

## 📊 Step 4: 결과 확인

### 성공 시:
- ✅ 텔레그램으로 브리핑 수신
- ✅ `finbrief/data/YYYY-MM-DD.json` 파일 자동 커밋
- ✅ GitHub Actions 로그에 "✅ 일일 브리핑 완료!" 표시

### 실패 시:
- ❌ Actions 탭에서 에러 로그 확인
- 주요 원인: Secrets 설정 오류, API 키 문제

---

## 🔔 Step 5: 알림 설정 (선택)

### GitHub Actions 실패 알림 받기
1. Repository → Settings → Notifications
2. "Actions" 체크
3. 이메일 또는 모바일 알림 설정

---

## ⚙️ 고급 설정

### 시간대 변경
한국시간 9시로 변경하려면:
```yaml
cron: '0 0 * * *'  # UTC 00:00 = KST 09:00
```

### 주말 제외
주말에는 발송하지 않으려면:
```yaml
cron: '0 23 * * 1-5'  # 월-금만 실행
```

---

## ✅ 완료 체크리스트

- [ ] GitHub Secrets 3개 등록 완료
- [ ] Workflow 파일 커밋 및 푸시
- [ ] 수동 테스트 실행
- [ ] 텔레그램 메시지 수신 확인
- [ ] 내일 아침 8시 자동 발송 대기

완료되면 **완전 자동화 완성!** 🎉
