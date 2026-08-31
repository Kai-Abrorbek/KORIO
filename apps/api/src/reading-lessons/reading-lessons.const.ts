/**
 * 읽기/듣기 레슨 XP.
 *
 * ── 왜 이 숫자인가 ──
 * 일반 레슨은 문제 17개의 xpReward 합계라 기본 200 안팎이 나온다. 읽기 레슨은
 * 6분짜리 한 편이고 활동이 네 가지(읽기·확인문제·낭독·쓰기)라, 다 하면 100
 * 근처가 되게 잡았다. 일반 레슨 절반쯤이다 — 짧고 부담이 적은 대신 보상도
 * 적어야 로드맵을 놔두고 이쪽만 도는 일이 안 생긴다.
 *
 * 활동별로 쪼갠 이유: 통으로 주면 대충 넘기고 XP 만 받는다. 낭독처럼 실제로
 * 힘든 걸 제일 크게 잡아야 그걸 하게 된다.
 */

/** 본문을 끝까지 읽고 확인 단계로 넘어가면 */
export const READING_BASE_XP = 15;
/** 확인 문제 정답 1개당 */
export const READING_QUIZ_XP_PER_CORRECT = 10;
/** 본문 낭독을 끝까지 (서버가 발음 평가로 확인한 경우만) */
export const READING_PRONUNCIATION_XP = 25;
/** 쓰기 제출 */
export const READING_WRITING_XP = 15;

/**
 * 쓰기로 인정할 최소 글자 수.
 * 한 글자 쓰고 제출해서 XP 를 받는 걸 막는다. 첨삭을 안 하는 이상 품질은
 * 못 보므로 최소한의 성의만 확인한다.
 */
export const READING_WRITING_MIN_CHARS = 10;
/** 저장할 쓰기 최대 길이 */
export const READING_WRITING_MAX_CHARS = 2000;

/**
 * 두 번째부터의 보상 배율.
 *
 * 0 으로 막지 않는 이유: 읽기는 반복해서 읽을수록 느는 활동이라 다시 오는 걸
 * 벌주면 안 된다. 그렇다고 같은 글을 계속 돌려 XP 를 캐게 두면 로드맵이
 * 의미가 없어지므로 30% 만 준다.
 */
export const READING_REPEAT_XP_RATE = 0.3;
