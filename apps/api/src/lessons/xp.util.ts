import { QuestionType } from './schemas/question.schema';

// 티어별 base XP (정답 / 오답) — 크게(듀오링고식)
const TIER: Record<string, { correct: number; wrong: number }> = {
  // T1 재인
  [QuestionType.IMAGE_CHOICE]: { correct: 10, wrong: 5 },
  [QuestionType.WORD_MATCHING]: { correct: 10, wrong: 5 },
  [QuestionType.AUDIO_MATCH]: { correct: 10, wrong: 5 },
  [QuestionType.LISTENING]: { correct: 10, wrong: 5 },
  // T2 조작
  [QuestionType.SENTENCE_BUILDER]: { correct: 15, wrong: 5 },
  [QuestionType.WORD_ARRANGE]: { correct: 15, wrong: 5 },
  [QuestionType.FILL_IN_BLANK]: { correct: 15, wrong: 5 },
  [QuestionType.DIALOG_COMPLETE]: { correct: 15, wrong: 5 },
  // T3 생산
  [QuestionType.TYPE_ANSWER]: { correct: 20, wrong: 10 },
  [QuestionType.TRANSLATE_TYPE]: { correct: 20, wrong: 10 },
  [QuestionType.TRANSLATE_BUILDER]: { correct: 20, wrong: 10 },
  [QuestionType.LISTEN_TYPE]: { correct: 20, wrong: 10 },
  [QuestionType.LISTEN_FILL]: { correct: 20, wrong: 10 },
  // T4 발화
  [QuestionType.SPEAKING]: { correct: 25, wrong: 10 },
};
const DEFAULT_TIER = { correct: 10, wrong: 5 };

export interface XpBreakdown {
  base: number;
  comboBonus: number;
  perfectBonus: number;
  firstClearBonus: number;
  total: number;
}

export function calcLessonXp(params: {
  questions: { _id: any; type: string }[];
  wrongQuestionIds: string[];
  combo: number;
  isFirstClear: boolean;
  isReview: boolean;
}): XpBreakdown {
  const { questions, wrongQuestionIds, combo, isFirstClear, isReview } = params;
  const wrongSet = new Set((wrongQuestionIds ?? []).map(String));

  let base = 0;
  for (const q of questions) {
    const tier = TIER[q.type] ?? DEFAULT_TIER;
    base += wrongSet.has(String(q._id)) ? tier.wrong : tier.correct;
  }

  // 복습은 base 절반 (반복 파밍 방지)
  const adjustedBase = isReview ? Math.round(base / 2) : base;

  const comboBonus = combo >= 3 ? Math.floor(combo / 3) * 5 : 0; // 3연속+마다 +5
  const perfectBonus = wrongSet.size === 0 ? 30 : 0; // 무실수
  const firstClearBonus = isFirstClear && !isReview ? 50 : 0; // 첫 클리어

  return {
    base: adjustedBase,
    comboBonus,
    perfectBonus,
    firstClearBonus,
    total: adjustedBase + comboBonus + perfectBonus + firstClearBonus,
  };
}

// 누적 XP → 레벨 (레벨업 보상감용). 곡선: Lv n ≈ 100·(n-1)^1.5
export function xpToLevel(totalXp: number): number {
  return Math.floor(Math.pow(Math.max(0, totalXp) / 100, 1 / 1.5)) + 1;
}

// 노드 완주 상자 — 등급 미지수(랜덤), 보석 짜게
export function rollChest(): {
  grade: 'wood' | 'silver' | 'gold';
  gems: number;
} {
  const rand = (a: number, b: number) =>
    a + Math.floor(Math.random() * (b - a + 1));
  const r = Math.random();
  if (r < 0.6) return { grade: 'wood', gems: rand(10, 15) };
  if (r < 0.9) return { grade: 'silver', gems: rand(16, 25) };
  return { grade: 'gold', gems: rand(26, 40) };
}

// 상자 보석 = 등급 랜덤 + 진도 보너스(섹션) + 완벽 보너스
export function rollChestReward(params: {
  section: number; // 노드 섹션 (진도)
  perfect: boolean; // 노드 전체 무실수 여부
}): { grade: 'wood' | 'silver' | 'gold'; gems: number } {
  const base = rollChest(); // 등급 + 기본 보석 (랜덤)

  const progressBonus = Math.max(0, params.section - 1) * 3; // 섹션1=+0, 섹션2=+3...
  const perfectBonus = params.perfect ? 15 : 0;

  return {
    grade: base.grade,
    gems: base.gems + progressBonus + perfectBonus,
  };
}
