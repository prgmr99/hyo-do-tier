import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 기존 효도티어 URL → 새 URL로 301 리다이렉트 (SEO 보호)
      {
        source: '/quiz',
        destination: '/hyodo-tier/quiz',
        permanent: true,
      },
      {
        source: '/result',
        destination: '/hyodo-tier/result',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/hyodo-tier/blog',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/hyodo-tier/blog/:slug',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/hyodo-tier/about',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/hyodo-tier/privacy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/hyodo-tier/terms',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
