import { QuestionType } from './schemas/question.schema';

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  XP 조정은 전부 이 파일에서.                                      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 *   XP_AWARD_DIVISOR    시드 XP 를 나누는 값 — 전체 물가를 한 번에 조절
 *   COMBO_XP_PER        콤보 1당
 *   QUESTION_XP_BY_TYPE 문제 타입별 기본값 (시드에 xpReward 가 없을 때)
 *   PRACTICE_BASE_XP    연습·학습로드 노드 모드별
 *   LEGEND_XP           레전드
 *   LEVEL_EXAM_XP       급수 졸업 시험
 *   GRAMMAR_QUIZ_XP     문법 퀴즈
 *   READING_*           읽기·듣기 레슨
 *   SPEAKING_SENTENCE_XP 말하기 문장 하나
 *
 * 여기 없는 XP 숫자:
 *   · 리그 유지 XP        league/league.service.ts 의 TIER_CONFIG.keepXp
 *   · 리그 챌린지 한 판    challenge/league-challenge.const.ts 의 TIER_CHALLENGE
 *     (둘 다 티어 설정과 한 줄로 붙어 있어야 읽히므로 남겨뒀다.
 *      다만 **같은 눈금**이라 XP_AWARD_DIVISOR 를 바꾸면 같이 봐야 한다)
 *   · 앱 표시용 미러      apps/mobile/src/constants/xp-mirror.ts
 *
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

/**
 * 시드에 박힌 XP 를 지급할 때 나누는 값.
 *
 * 시드의 xpReward 합계(15문항 ≈ 228)가 너무 후했다 — 노드 하나만 풀어도 리그
 * 유지 XP 를 넘겨서 리그가 실력 표시로서 의미를 잃었다.
 *
 * 시드를 다시 돌리지 않고 **지급 시점에** 나눈다. 시드의 xpReward 는 "문제
 * 난이도 비율" 의 출처로 그대로 두고(재인 10 · 조작 15 · 생산 20 · 발화 25),
 * 절대량만 여기서 조절한다. 다시 조정할 일이 생기면 이 한 줄이다.
 *
 * ⚠️ 이 값을 바꾸면 리그 유지 XP(TIER_CONFIG.keepXp)도 같이 봐야 한다.
 *    둘은 같은 눈금을 쓴다.
 */
export const XP_AWARD_DIVISOR = 3;

/** 시드·표에 적힌 기본 XP → 실제로 주는 XP */
export function awardedXp(raw: number): number {
  return Math.max(0, Math.round((raw ?? 0) / XP_AWARD_DIVISOR));
}

/** 콤보 1당 추가 XP.
 *
 * 기본 XP 를 1/3 로 내렸으므로 콤보도 같이 내린다. 3 을 그대로 두면 만점
 * 콤보(15 × 3 = 45)가 레슨 기본(≈76)의 60% 가 되어, 예전에 고쳤던
 * "콤보만 주는 것 같다" 로 되돌아간다. 콤보는 덤이지 본체가 아니므로
 * 전체의 15~20% 안쪽(만점 15콤보 → 15)에 맞춘다. */
export const COMBO_XP_PER = 1;

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

// ── 모드별 고정 보상 ───────────────────────────────────────────────
// 아래 값들은 **그대로 지급된다** (XP_AWARD_DIVISOR 를 겹쳐 적용하지 않는다).
// 손으로 정한 최종 숫자이고, 그 배율은 시드가 넣어둔 값을 위한 것이다.

/** 레전드 완주. ⚠️ 앱 미러(xp-mirror.ts)와 같은 값이어야 한다 */
export const LEGEND_XP = 100;

/** 급수 졸업 시험 통과. 떨어지면 이 값의 1/3 */
export const LEVEL_EXAM_XP = 150;

/** 문법 퀴즈 통과 */
export const GRAMMAR_QUIZ_XP = 15;

// 읽기·듣기 레슨 — 활동별로 쪼갠 이유는 reading-lessons.const.ts 주석 참고
/** 지문 완독 */
export const READING_BASE_XP = 15;
/** 확인 문제 1개 정답당 */
export const READING_QUIZ_XP_PER_CORRECT = 10;
/** 낭독까지 했을 때 */
export const READING_PRONUNCIATION_XP = 25;
/** 쓰기까지 했을 때 */
export const READING_WRITING_XP = 15;
/** 이미 끝낸 지문을 다시 할 때의 배율 */
export const READING_REPEAT_XP_RATE = 0.3;

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
  // baseXp 는 시드가 넣어둔 합계다 — 지급 시점에 나눈다 (XP_AWARD_DIVISOR 주석 참고)
  return awardedXp(baseXp) + safeCombo * COMBO_XP_PER;
}

/**
 * 연습 모드 기본 XP (클라가 보내는 값 대신 서버가 정한다).
 *
 * 레슨 기본 XP 를 1/3 로 내리면서 이 표도 같은 비율로 내렸다. 모드 사이의
 * 상대적 균형은 예전 그대로다 — 노드 복습이 제일 짜고(반복 가능해서),
 * 하루 마무리가 제일 후하다.
 *
 * ⚠️ 여기 적힌 값이 **그대로 지급된다** (calcLessonXp 와 달리 나누지 않는다).
 *    이 표는 손으로 정한 최종 숫자이고, XP_AWARD_DIVISOR 는 시드가 넣어둔
 *    값을 위한 것이다. 둘을 겹쳐 적용하면 1/9 이 된다.
 */
export const PRACTICE_BASE_XP: Record<string, number> = {
  review: 50, // 오답 복습
  nodeReview: 13, // 노드 복습 — 반복해서 돌 수 있어 일부러 박하게
  wordPractice: 25, // 단어 연습
  expressionPractice: 25, // 표현 카드 뒤 빈칸·타이핑 연습
  // 학습 로드 모드 — 하루(=유닛)의 문제 노드들.
  // final 이 가장 높은 건 하루를 끝낸 보상이라서다
  unitReview: 30, // 지난 과 복습
  unitRecap: 30, // 2일차 — 어제 배운 것 되짚기
  unitVocab: 35, // 어휘 문제 레슨 하나
  unitGrammar: 35, // 문법 문제 레슨 하나
  unitFinal: 63, // 마무리 확인 — 하루를 끝낸 보상
};

/**
 * 말하기 학습 모드 — 발음이 **통과한 문장 하나당**.
 *
 * 이 모드만 문장 단위로 준다. 세션 단위로 주면 중간에 나간 사람은 0 이라
 * 한 문장 한 문장 맞히려고 버틸 이유가 없어진다 — 그게 이 모드의 전부다.
 *
 * 균형: 한 주제(약 20문장)를 다 통과하면 100. 표현 퀴즈 연습(75)보다 조금
 * 후하다. 발화가 빈칸 채우기보다 부담이 큰 만큼이다.
 *
 * ⚠️ 같은 문장은 **하루 한 번만** 인정된다 (speech.service 의 speakingPassedAt).
 *    그게 없으면 한 문장을 반복해서 리그 1등을 살 수 있다 —
 *    리그 주간 XP = UserStats.xpEarned 합계다.
 */
export const SPEAKING_SENTENCE_XP = 2;

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

/**
 * 한 번의 완료 요청에서 인정하는 최대 정답 수.
 *
 * XP 는 서버가 계산하지만 correctAnswers / questionIds 는 클라가 보낸다.
 * 상한이 없으면 correctAnswers: 999999 하나로 리그 1등을 살 수 있다.
 * 가장 긴 세션(유닛 최종 + 복습 라운드)도 이 값을 넘지 않는다.
 */
export const MAX_SESSION_ANSWERS = 100;

/** 클라가 보낸 개수를 0..limit 정수로 자른다 */
export function clampCount(value: unknown, limit: number): number {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(n, limit);
}
