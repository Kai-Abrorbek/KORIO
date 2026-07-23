export const COMBO_XP_PER = 1; // 콤보 1당 추가 XP

// XP = 레슨 기본값(xpReward) + 콤보
// 콤보는 클라가 보내므로 정답 수로 상한 (조작 방지)
export function calcLessonXp(
  baseXp: number,
  combo: number,
  correctAnswers: number,
): number {
  const safeCombo = Math.max(0, Math.min(combo ?? 0, correctAnswers ?? 0));
  return (baseXp ?? 0) + safeCombo * COMBO_XP_PER;
}

// ── 연습 모드 기본 XP (클라가 보내는 값 대신 서버가 정한다) ──
export const PRACTICE_BASE_XP: Record<string, number> = {
  review: 20, // 오답 복습
  nodeReview: 5, // 노드 복습
  wordPractice: 10, // 단어 연습
};

/** 연습 모드 XP = 기본값 + 콤보(정답 수 상한) */
export function calcPracticeXp(
  mode: string,
  combo: number,
  correctAnswers: number,
): number {
  const base = PRACTICE_BASE_XP[mode] ?? 0;
  if (!base) return 0;
  // nodeReview 는 콤보 보너스 없음 (반복 학습이라 보상 인플레 방지)
  if (mode === 'nodeReview') return base;
  return calcLessonXp(base, combo, correctAnswers);
}
