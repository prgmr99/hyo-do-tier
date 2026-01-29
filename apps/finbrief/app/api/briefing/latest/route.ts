import { NextResponse } from 'next/server';
import { getLatestBriefing } from '@/lib/briefing';

/**
 * GET /api/briefing/latest
 *
 * finbrief/data/ 디렉토리에서 가장 최신 날짜의 JSON 파일을 읽어 반환합니다.
 * 파일 형식: YYYY-MM-DD.json (예: 2026-01-29.json)
 */
export const revalidate = 3600;

export async function GET() {
  const data = getLatestBriefing();
  return NextResponse.json(data);
}
