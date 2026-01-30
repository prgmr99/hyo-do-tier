import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // Shared packages
  'packages/utils',
  'packages/ui',
  'packages/services',
  'packages/finbrief-api',
  // Apps
  'apps/web',
  'apps/hyodo-tier',
  'apps/finbrief',
]);
