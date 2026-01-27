# FinBrief Migration Summary

## Migration from apps/web to standalone app

**Date**: January 27, 2026
**Goal**: Extract FinBrief from `apps/web` into independent `apps/finbrief` Next.js app

## Changes Made

### 1. Created New App Structure

```
apps/finbrief/
├── app/
│   ├── api/subscribe/route.ts    # Email subscription API
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   ├── fonts.ts                   # Font config
│   ├── globals.css                # Global styles
│   └── finbrief.css               # FinBrief-specific styles
├── components/
│   ├── backgrounds/               # LiquidEther 3D background
│   └── landing/                   # ScrollReveal components
├── public/                        # Static assets
└── config files                   # package.json, tsconfig, etc.
```

### 2. Key Updates

**Services Integration**:
- Updated `app/api/subscribe/route.ts` to use `@hyo/services`:
  ```typescript
  import { createServerClient } from '@hyo/services/supabase';
  import { getResendClient } from '@hyo/services/resend';
  import { WelcomeEmail } from '@hyo/services/email';
  ```

**Component Paths**:
- Updated imports in `page.tsx`:
  ```typescript
  // Before: '@/components/finbrief/landing'
  // After:  '@/components/landing'
  ```

**Layout**:
- Combined root layout structure from `apps/web/app/layout.tsx`
- Added FinBrief-specific metadata
- Integrated GoogleAnalytics from `@hyo/ui`

### 3. Configuration Files

- `package.json`: Dev server on port 3002
- `tsconfig.json`: Extends `@hyo/tsconfig/nextjs.json`
- `next.config.ts`: Basic Next.js config
- `tailwind.config.ts`: Empty (inherits from theme)
- `postcss.config.mjs`: Tailwind PostCSS setup
- `biome.json`: Copied from apps/web

### 4. Fixed Build Issues

**Issue**: TypeScript error in `@hyo/ui/src/KakaoScript.tsx`
```
Property 'Kakao' does not exist on type 'Window'
```

**Fix**: Added type declaration directly in component:
```typescript
declare global {
  interface Window {
    Kakao?: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
    };
  }
}
```

**Issue**: Undefined env variable error
```
Argument of type 'string | undefined' is not assignable
```

**Fix**: Added null check:
```typescript
const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
if (window.Kakao && !window.Kakao.isInitialized() && kakaoKey) {
  window.Kakao.init(kakaoKey);
}
```

## Build Verification

```bash
pnpm turbo build --filter=@hyo/finbrief
```

**Result**: ✅ Build successful

```
Route (app)
├ ○ /
├ ○ /_not-found
└ ƒ /api/subscribe

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Development Commands

```bash
# Dev server (port 3002)
pnpm --filter=@hyo/finbrief dev

# Build
pnpm turbo build --filter=@hyo/finbrief

# Lint
pnpm --filter=@hyo/finbrief lint

# Format
pnpm --filter=@hyo/finbrief format
```

## Environment Variables Required

```env
NEXT_PUBLIC_DOMAIN_URL=https://finbrief.yeomniverse.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=FinBrief <noreply@finbrief.io>
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## Vercel Deployment Settings

```
Root Directory: apps/finbrief
Build Command: cd ../.. && pnpm turbo build --filter=@hyo/finbrief
Install Command: pnpm install
```

## Next Steps

1. Copy public assets (icons, og-image) if needed
2. Configure environment variables in production
3. Set up Vercel project
4. Test subscription flow end-to-end
5. Verify Telegram bot integration

## Files Modified Outside apps/finbrief

- `packages/ui/src/KakaoScript.tsx` - Added type declarations and null checks
- `packages/ui/src/types/kakao.d.ts` - Created (may not be needed with inline declarations)
