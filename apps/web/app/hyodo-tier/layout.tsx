import type { Metadata } from 'next';
import Script from 'next/script';
import { Footer } from '@hyo/ui';

export const metadata: Metadata = {
  title: {
    default: '효도티어 | 부모님 탐구영역',
    template: '%s | 효도티어',
  },
  description:
    '당신의 효도 등급은 몇 등급입니까? 2025학년도 대국민 효도능력시험. 지금 바로 응시하고 효도 등급을 확인하세요!',
  keywords: [
    '효도티어',
    '부모님 탐구영역',
    '효도 테스트',
    '심리테스트',
    'MZ세대',
    '부모님 퀴즈',
  ],
  openGraph: {
    title: '효도티어 | 부모님 탐구영역',
    description:
      '당신의 효도 등급은 몇 등급입니까? 2025학년도 대국민 효도능력시험',
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/hyodo-tier`,
    siteName: '효도티어',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '효도티어 부모님 탐구영역 시험지 표지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '효도티어 | 부모님 탐구영역',
    description:
      '당신의 효도 등급은 몇 등급입니까? 2025학년도 대국민 효도능력시험',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/hyodo-tier`,
  },
};

export default function HyoTierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Quiz schema for better SEO
  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: '2025학년도 대국민 효도능력시험',
    description:
      '부모님에 대한 관심도, 친밀도, 표현력을 측정하는 심리 진단 테스트',
    educationalLevel: 'All ages',
    numberOfQuestions: 14,
    quiz: {
      '@type': 'Question',
      name: '부모님 탐구영역',
      text: '당신은 부모님에 대해 얼마나 알고 있습니까?',
    },
  };

  return (
    <>
      <div className="flex justify-center bg-stone-200 min-h-screen">
        <div className="w-full max-w-[480px] min-h-screen bg-paper text-ink shadow-2xl relative overflow-x-hidden">
          {children}
          <Footer />
        </div>
      </div>
      <Script
        id="quiz-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
    </>
  );
}
