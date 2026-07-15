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
