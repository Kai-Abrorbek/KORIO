import { QuestionType } from './schemas/question.schema';

/**
 * XP 경제의 단일 출처.
 *
 * 기준은 "문제 하나당 XP" 다. 레슨의 기본 XP 는 그 레슨이 들고 있는 문제들의
 * xpReward 합계이고(시드가 계산해 `lesson.xpReward` 에 넣는다), 연습 모드는
 * 문제를 여기저기서 긁어오므로 모드별 고정값을 쓴다.
 *
 * 예전에는 레슨 기본 XP 가 `문항수 × 2`(15문항 → 30) 였다. 문제마다 붙어 있는
 * xpReward(10~25)를 아무도 안 읽고 있었고, 그래서 XP 의 변동분이 사실상 콤보뿐이라
 * "콤보만 주는 것 같다"는 체감이 났다. 이제 문제 난이도가 보상에 반영된다.
 */

/** 콤보 1당 추가 XP.
 *
 * 예전 값은 1 이었는데, 그때는 레슨 기본 XP 가 30 이라 만점 콤보(15)가 전체의
 * 33% 를 차지했다. 기본 XP 가 문제 합계(≈228)로 커진 지금 같은 비중을 유지하면
 * 콤보 하나가 레슨 하나만큼 값이 나가 버린다. 콤보는 덤이지 본체가 아니므로
 * 전체의 15% 안쪽(만점 15콤보 → 45)에 맞춘다. */
export const COMBO_XP_PER = 3;

/**
 * 문제 타입별 기본 XP. 시드 데이터의 문제에는 각자 xpReward 가 박혀 있고,
 * 이 표는 그 값이 빠진 문제를 채울 때 쓰는 기준이다.
 *
 * T1 재인 10 · T2 조작 15 · T3 생산 20 · T4 발화 25.
 * 중급 5종은 지문을 읽고 여러 요소를 동시에 처리해야 해서 한 단계씩 위로 잡았다.
 */
export const QUESTION_XP_BY_TYPE: Record<string, number> = {
  // T1 재인
  [QuestionType.IMAGE_CHOICE]: 10,
  [QuestionType.WORD_MATCHING]: 10,
  [QuestionType.AUDIO_MATCH]: 10,
  [QuestionType.LISTENING]: 10,
  // T2 조작
  [QuestionType.SENTENCE_BUILDER]: 15,
  [QuestionType.WORD_ARRANGE]: 15,
  [QuestionType.FILL_IN_BLANK]: 15,
  [QuestionType.DIALOG_COMPLETE]: 15,
  [QuestionType.DIALOG_ORDER]: 15,
  // 문법 트랙 — 빈칸/조립 둘 다 조작 계열
  [QuestionType.GRAMMAR_BLANK]: 15,
  [QuestionType.GRAMMAR_BUILD]: 15,
  // T3 생산
  [QuestionType.TYPE_ANSWER]: 20,
  [QuestionType.TRANSLATE_TYPE]: 20,
  [QuestionType.TRANSLATE_BUILDER]: 20,
  [QuestionType.LISTEN_TYPE]: 20,
  [QuestionType.LISTEN_FILL]: 20,
  [QuestionType.ERROR_HUNT]: 20,
  [QuestionType.VERB_TRANSFORM]: 20,
  // T4 발화·독해
  [QuestionType.REPLY_BUILDER]: 25,
  [QuestionType.SPEAKING]: 25,
  [QuestionType.READING_QUIZ]: 25,
  [QuestionType.CLOZE_PASSAGE]: 25,
};

/** 타입도 xpReward 도 모를 때 */
export const QUESTION_XP_FALLBACK = 10;

/** 문제 한 개의 XP. 시드가 레슨 기본 XP 를 합산할 때 쓴다. */
export function questionXp(q: { xpReward?: number; type?: string }): number {
  if ((q.xpReward ?? 0) > 0) return q.xpReward as number;
  return QUESTION_XP_BY_TYPE[q.type ?? ''] ?? QUESTION_XP_FALLBACK;
}

/** 레슨 기본 XP = 문제들의 xpReward 합계 */
export function sumQuestionXp(
  questions: { xpReward?: number; type?: string }[],
): number {
  return questions.reduce((sum, q) => sum + questionXp(q), 0);
}

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

/**
 * 연습 모드 기본 XP (클라가 보내는 값 대신 서버가 정한다).
 *
 * 레슨 기본 XP 가 `문항수 × 2` 에서 문제 합계(15문항 ≈ 228)로 바뀌면서
 * 같은 비율(≈7.6배)로 올렸다. 모드 사이의 상대적 균형은 예전 그대로다 —
 * 노드 복습이 제일 짜고(반복 가능해서), 하루 마무리가 제일 후하다.
 */
export const PRACTICE_BASE_XP: Record<string, number> = {
  review: 150, // 오답 복습
  nodeReview: 40, // 노드 복습 — 반복해서 돌 수 있어 일부러 박하게
  wordPractice: 75, // 단어 연습
  expressionPractice: 75, // 표현 카드 뒤 빈칸·타이핑 연습
  // 학습 로드 모드 — 하루(=유닛)의 문제 노드들.
  // final 이 가장 높은 건 하루를 끝낸 보상이라서다
  unitReview: 90, // 지난 과 복습
  unitRecap: 90, // 2일차 — 어제 배운 것 되짚기
  unitVocab: 105, // 어휘 문제 레슨 하나
  unitGrammar: 105, // 문법 문제 레슨 하나
  unitFinal: 190, // 마무리 확인 — 하루를 끝낸 보상
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
