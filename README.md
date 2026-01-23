# 🌌 Yeomniverse

<div align="center">
  <h1>Yeomniverse</h1>
  <p><strong>Seungjun Yeom's Omniverse of Digital Services</strong></p>
  
  <img src="https://img.shields.io/badge/Turborepo-2.7-blue?style=for-the-badge&logo=turborepo&logoColor=white" />
  <img src="https://img.shields.io/badge/pnpm-9.0-yellow?style=for-the-badge&logo=pnpm&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" />
  
  <br/><br/>
  
  <p>
    A scalable monorepo architecture powering multiple digital services<br/>
    Built with Turborepo, pnpm workspaces, and modern web technologies
  </p>
</div>

---

## 🌟 Featured Services

### 💯 [Hyo-Tier](https://hyo-tier.vercel.app)
**효도능력시험 (Filial Piety Test)**
- 2025학년도 대국민 효도능력시험
- 14-question quiz testing parent-child relationships
- 8 unique personality type results
- Viral KakaoTalk sharing integration
- Mobile-first responsive design

**Tech:** Next.js 16, React 19, Tailwind CSS v4, Zustand

---

## 📁 Monorepo Structure

```
yeomniverse/
├── apps/
│   └── web/                  # Hyo-Tier service
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── utils/                # Shared utilities
│   └── tsconfig/             # Shared TypeScript configs
├── turbo.json                # Turborepo pipeline
├── pnpm-workspace.yaml       # Workspace configuration
└── package.json              # Root configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- pnpm 9.0+

### Installation

```bash
# Clone repository
git clone https://github.com/prgmr99/yeomniverse.git
cd yeomniverse

# Install dependencies
pnpm install
```

### Development

```bash
# Run all services
pnpm dev

# Run specific service
pnpm turbo dev --filter=@hyo/web
```

### Build

```bash
# Build all services
pnpm build

# Build specific service
pnpm turbo build --filter=@hyo/web
```

## 📦 Shared Packages

### @hyo/ui
Shared UI component library used across all services.

**Components:**
- Footer - Application footer with policy links
- Loading - Loading spinner animation
- GoogleAdSense - AdSense integration
- GoogleAnalytics - Analytics tracking
- KakaoScript - Kakao SDK loader

### @hyo/utils
Shared utilities and constants.

**Exports:**
- Quiz question data (QUESTIONS)
- Effect types
- Common constants

### @hyo/tsconfig
Shared TypeScript configurations for consistency.

**Configs:**
- `base.json` - Base TypeScript settings
- `nextjs.json` - Next.js specific
- `react-library.json` - React libraries

## 🌐 Deployment

Each service is independently deployable to Vercel:

- **Hyo-Tier**: `apps/web` → Production deployment
- Root Directory: `apps/web`
- Build Command: `cd ../.. && pnpm turbo build --filter=@hyo/web`

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

## 🏗️ Architecture Benefits

✅ **Code Sharing** - Reuse components across all services  
✅ **Fast Builds** - Turborepo caching & parallel execution  
✅ **Type Safety** - Shared TypeScript configurations  
✅ **Scalable** - Easy to add new services  
✅ **Developer Experience** - Single command for everything  

## 🔧 Adding New Services

```bash
# Create new app
mkdir apps/my-service

# Add dependencies
{
  "name": "@hyo/my-service",
  "dependencies": {
    "@hyo/ui": "workspace:*",
    "@hyo/utils": "workspace:*"
  }
}

# Install
pnpm install
```

## 📚 Documentation

- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- [Monorepo Migration Walkthrough](/.gemini/antigravity/brain/*/walkthrough.md)

## 🛠️ Available Commands

```bash
pnpm dev              # Run all dev servers
pnpm build            # Build all services
pnpm lint             # Lint all packages
pnpm format           # Format all code
pnpm clean            # Clean build outputs
```

## 🎯 Future Services

Coming soon to the Yeomniverse:
- Admin Dashboard
- Community Platform
- Analytics Dashboard
- More creative projects...

## 📄 License

MIT License - See [LICENSE](./LICENSE) file

---

<div align="center">
  <p>Built with ❤️ by Seungjun Yeom</p>
  <p>Powered by Turborepo · Next.js · TypeScript</p>
  
  **🌌 Welcome to the Yeomniverse 🌌**
</div>
