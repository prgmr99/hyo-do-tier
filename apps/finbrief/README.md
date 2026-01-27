# FinBrief Landing Page

30초 만에 읽는 AI 재테크 브리핑 서비스의 랜딩 페이지입니다.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Libraries**: Framer Motion, Lucide React
- **3D Graphics**: Three.js (for LiquidEther background)
- **Backend Services**:
  - Supabase (subscriber data storage)
  - Resend (email delivery)
  - Services imported from `@hyo/services`

## Features

- 유동적인 3D 배경 (LiquidEther)
- 스크롤 애니메이션 (ScrollReveal, Stagger animations)
- 이메일 구독 시스템
- 텔레그램 봇 연동

## Development

```bash
# Install dependencies (from root)
pnpm install

# Run dev server
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Format
pnpm format
```

Dev server runs on port 3002.

## Project Structure

```
apps/finbrief/
├── app/
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts          # Email subscription API
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Landing page
│   ├── fonts.ts                   # Font configuration (Noto Sans/Serif KR)
│   ├── globals.css                # Global styles
│   └── finbrief.css               # FinBrief-specific styles
├── components/
│   ├── backgrounds/
│   │   ├── LiquidEther.jsx        # 3D fluid simulation background
│   │   ├── LiquidEther.css
│   │   └── index.ts
│   └── landing/
│       ├── ScrollReveal.tsx       # Scroll-triggered animations
│       └── index.ts
└── public/                        # Static assets
```

## Environment Variables

Required environment variables in `.env.local`:

```env
# Domain
NEXT_PUBLIC_DOMAIN_URL=https://finbrief.yeomniverse.com

# Supabase (from @hyo/services)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Resend (from @hyo/services)
RESEND_API_KEY=
RESEND_FROM_EMAIL=FinBrief <noreply@finbrief.io>

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## Deployment

Deploy to Vercel:

```bash
# Root Directory: apps/finbrief
# Build Command: cd ../.. && pnpm turbo build --filter=@hyo/finbrief
# Install Command: pnpm install
```

## Services Package Integration

This app uses shared services from `packages/services/`:

- `@hyo/services/supabase` - Supabase client
- `@hyo/services/resend` - Resend email client
- `@hyo/services/email` - Email templates (WelcomeEmail)

These services are centralized for reuse across all apps in the monorepo.
