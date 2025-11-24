"use client";

import Link from "next/link";
import { Share2, RotateCcw } from "lucide-react";

export default function ResultPage() {
  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-6 animate-fade-in space-y-8">
      
      {/* 1. 결과 등급 (도장 애니메이션) */}
      <div className="relative w-full text-center py-6 border-b-2 border-dashed border-ink/20">
        <p className="text-sm font-serif text-ink/60 mb-2">2025학년도 효도능력시험 성적표</p>
        
        {/* 캐릭터 이름 */}
        <h1 className="text-3xl font-serif font-black mb-4">
          전설의 유니콘 효자
        </h1>

        {/* 도장 쾅! (Tailwind Config에 정의한 animate-stamp-bang 사용) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="border-4 border-grading text-grading rounded-xl px-4 py-2 text-5xl font-black font-serif opacity-0 animate-stamp-bang -rotate-12 whitespace-nowrap bg-paper/80 backdrop-blur-sm">
             1등급
           </div>
        </div>
      </div>

      {/* 2. 캐릭터 이미지 (Placeholder) */}
      <div className="w-64 h-64 bg-stone-200 rounded-lg flex items-center justify-center text-stone-400">
        (캐릭터 이미지 영역)
      </div>

      {/* 3. 상세 분석 & 처방전 */}
      <div className="w-full bg-white/60 p-6 rounded-lg border border-stone-200 space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg mb-1 flex items-center">
            🩺 닥터의 처방전
          </h3>
          <p className="text-sm text-ink/80 leading-relaxed bg-yellow-50 p-3 rounded border border-yellow-100">
            "이미 완벽하니 더 바랄 게 없습니다. 지금처럼만 부모님 곁에 머물러 주세요."
          </p>
        </div>

        {/* 레이더 차트 들어갈 자리 */}
        <div className="w-full h-40 bg-stone-100 rounded flex items-center justify-center text-xs text-stone-400">
          [레이더 차트 영역]
        </div>
      </div>

      {/* 4. 액션 버튼 (공유 & 다시하기) */}
      <div className="w-full space-y-3 pb-10">
        <button className="w-full bg-[#FEE500] text-[#191919] py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all">
          <Share2 className="w-5 h-5" /> 카카오톡으로 자랑하기
        </button>
        
        <Link 
          href="/" 
          className="block w-full bg-stone-800 text-white py-4 rounded-lg font-bold text-center hover:bg-black transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> 재시험 치기
        </Link>
      </div>

    </main>
  );
}