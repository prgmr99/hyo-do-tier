import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return { type: 'img', props: { src, alt, ...props } };
  },
}));
