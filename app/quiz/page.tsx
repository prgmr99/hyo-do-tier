'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // 라우터
import { useEffect } from 'react';
import ProgressBar from '@/components/quiz/ProgressBar';
import { type Effects, QUESTIONS } from '@/lib/constants'; // 데이터 불러오기
import { useQuizStore } from '@/store/useQuizStore'; // 스토어 불러오기

export default function QuizPage() {
  const router = useRouter();

  // Zustand에서 필요한 상태와 액션 꺼내오기
  const { currentStep, nextStep, setAnswer, resetQuiz } = useQuizStore();

  // 현재 보여줄 질문 데이터
  const currentQuestion = QUESTIONS[currentStep];

  // 퀴즈가 모두 끝났는지 체크
  const isFinished = currentStep >= QUESTIONS.length;

  // 답변 클릭 핸들러
  const handleOptionClick = (index: number, effects: Effects) => {
    // 1. 점수 저장
    setAnswer(index, effects);

    // 2. 다음 문제로 (애니메이션은 Framer Motion이 처리)
    nextStep();
  };

  // 컴포넌트 마운트 시 퀴즈 초기화
  // biome-ignore lint/correctness/useExhaustiveDependencies: <컴포넌트 마운트>
  useEffect(() => {
    if (currentStep === 0) {
      resetQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 결과 페이지 이동 처리
  useEffect(() => {
    if (isFinished) {
      router.push('/result'); // 결과 페이지로 자동 이동
    }
  }, [isFinished, router]);

  // 로딩 중이거나 완료된 상태면 빈 화면 (리다이렉트 대기)
  if (!currentQuestion || isFinished) return null;

  return (
    <main className="min-h-screen flex flex-col bg-paper">
      {/* 상단 진행바 */}
      <ProgressBar current={currentStep} total={QUESTIONS.length} />

      {/* 질문 영역 */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-10 space-y-8 overflow-hidden">
        {/* 애니메이션 래퍼 */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentStep}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="space-y-8"
          >
            {/* 질문 텍스트 */}
            <div className="space-y-3">
              <span className="text-grading font-bold font-serif text-xl border-b-2 border-grading/20 inline-block pb-1">
                문제 {currentQuestion.id}
              </span>
              <h2 className="text-2xl font-serif font-bold leading-snug break-keep text-ink">
                {currentQuestion.q}
              </h2>
            </div>

            {/* 선택지 목록 */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleOptionClick(index, option.effects)}
                  className="w-full text-left p-5 rounded-xl border-2 border-stone-200 bg-white/60 hover:bg-stone-100 hover:border-omr active:scale-[0.98] active:bg-stone-200 transition-all group flex items-center justify-between shadow-sm"
                >
                  <span className="font-sans text-ink/90 text-lg group-hover:font-medium">
                    {option.text}
                  </span>
                  {/* OMR 마킹 느낌의 체크박스 */}
                  <div className="w-6 h-6 rounded-full border-2 border-stone-300 group-hover:border-grading group-hover:bg-grading transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
