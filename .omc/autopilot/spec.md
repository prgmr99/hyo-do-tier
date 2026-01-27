# Yeomniverse Monorepo Restructuring Specification

## Summary

Restructure the monorepo to split `apps/web` into three independent Next.js apps with shared services extracted to `@hyo/services`.

## Target Structure

```
yeomniverse/
├── apps/
│   ├── web/                    # Portal (yeomniverse.com)
│   ├── hyodo-tier/             # Quiz app (hyodo-tier.yeomniverse.com)
│   └── finbrief/               # Landing/subscription (finbrief.yeomniverse.com)
├── packages/
│   ├── ui/                     # @hyo/ui (existing)
│   ├── utils/                  # @hyo/utils (existing)
│   ├── services/               # @hyo/services (NEW)
│   └── tsconfig/               # @hyo/tsconfig (existing)
```

## File Migration Map

### apps/hyodo-tier

| Source | Destination |
|--------|-------------|
| `apps/web/app/hyodo-tier/**` | `apps/hyodo-tier/app/**` |
| `apps/web/store/useQuizStore.ts` | `apps/hyodo-tier/store/useQuizStore.ts` |
| `apps/web/hooks/useKakaoShare.ts` | `apps/hyodo-tier/hooks/useKakaoShare.ts` |
| `apps/web/components/quiz/**` | `apps/hyodo-tier/components/quiz/**` |
| `apps/web/lib/calculateResult.ts` | `apps/hyodo-tier/lib/calculateResult.ts` |
| `apps/web/lib/resultData.ts` | `apps/hyodo-tier/lib/resultData.ts` |
| `apps/web/lib/blogData.ts` | `apps/hyodo-tier/lib/blogData.ts` |
| `apps/web/app/api/og/**` | `apps/hyodo-tier/app/api/og/**` |
| `apps/web/app/fonts.ts` | `apps/hyodo-tier/app/fonts.ts` |
| `apps/web/app/globals.css` | `apps/hyodo-tier/app/globals.css` |

### apps/finbrief

| Source | Destination |
|--------|-------------|
| `apps/web/app/finbrief/**` | `apps/finbrief/app/**` |
| `apps/web/components/finbrief/**` | `apps/finbrief/components/**` |
| `apps/web/app/api/finbrief/**` | `apps/finbrief/app/api/**` |

### packages/services

| Source | Destination |
|--------|-------------|
| `apps/web/lib/supabase/**` | `packages/services/src/supabase/**` |
| `apps/web/lib/resend/**` | `packages/services/src/resend/**` |
| `apps/web/lib/email/**` | `packages/services/src/email/**` |

## Package Dependencies

| Package | Depends On |
|---------|------------|
| `apps/web` | @hyo/ui, @hyo/utils |
| `apps/hyodo-tier` | @hyo/ui, @hyo/utils |
| `apps/finbrief` | @hyo/ui, @hyo/services |
| `@hyo/services` | @supabase/supabase-js, resend, react |

## Acceptance Criteria

1. `pnpm turbo build` passes for all apps
2. Each app runs independently with `turbo dev --filter=@hyo/<app>`
3. All TypeScript path resolutions work
4. Hyodo-tier quiz flow works end-to-end
5. FinBrief landing loads with animation and subscription works
6. Portal links to subdomains correctly
