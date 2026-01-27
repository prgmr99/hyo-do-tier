import type { Metadata } from 'next';
import './globals.css';
import './finbrief.css';
import { GoogleAnalytics } from '@hyo/ui';
import { sans, serif } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://finbrief.yeomniverse.com'),
  title: {
    default: 'FinBrief | AI 재테크 브리핑',
    template: '%s | FinBrief',
  },
  description: '30초 만에 읽는 AI 재테크 브리핑. 매일 아침 8시, 핵심 뉴스만 텔레그램으로 받아보세요.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'FinBrief',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
