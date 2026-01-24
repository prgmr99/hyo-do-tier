import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/hyodo-tier',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
