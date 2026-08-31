/**
 * AI 튜터 원가 관리.
 *
 * ⚠️ 이 기능은 우리 서비스에서 가장 비싼 기능이다.
 * 실측 기준 대화 1분에 $0.05~0.08 (gpt-realtime-mini), 길고 문맥이 쌓인
 * 대화는 $0.15/분까지 간다. 구독료가 월 49,000 UZS(약 $4) 인데 하루 10분씩
 * 쓰면 원가가 월 $18 이다 — 무제한으로 열면 쓸수록 손해다.
 *
 * 그래서 쿼터를 UI 가 아니라 **토큰 발급 지점**에서 막는다. 클라가 우회할 수
 * 없는 유일한 자리다.
 */

/**
 * 모델.
 *
 * 기본은 mini. 정가 모델보다 3배 가량 싸고 회화 연습엔 충분하다.
 * ⚠️ 구형 `gpt-realtime-mini` 는 deprecated 다 — 2.1-mini 를 쓴다.
 *
 * 바꿔서 비교하려면 .env 의 OPENAI_REALTIME_MODEL 만 고치면 된다.
 * 세션마다 어떤 모델로 돌았는지 TutorSession.model 에 남으므로 나중에
 * 사용량을 모델별로 갈라 볼 수 있다.
 */
export const TUTOR_MODEL =
  process.env.OPENAI_REALTIME_MODEL?.trim() || 'gpt-realtime-2.1-mini';

/**
 * 비싼 모델인지. 이름에 'mini' 가 없으면 정가 모델로 본다.
 *
 * 실험하려고 잠깐 올렸다가 그대로 배포되는 사고를 막으려고, 서버가 뜰 때와
 * 세션을 만들 때 시끄럽게 알린다. 조용히 3배 비싸지는 게 제일 나쁘다.
 */
export const IS_PREMIUM_MODEL = !/mini/i.test(TUTOR_MODEL);

/** 참고용 분당 원가 추정 (실측 기반). 로그에만 쓴다 */
export const EST_COST_PER_MIN_USD = IS_PREMIUM_MODEL ? 0.2 : 0.065;

/** 한 세션 최대 길이(분). 길어질수록 문맥이 쌓여 분당 원가가 오른다 */
export const MAX_SESSION_MINUTES = 10;

/** 등급별 하루 사용 한도(분) */
export const DAILY_MINUTES = {
  /** 무료: 맛보기. 이걸로 결제 전환을 노린다 */
  free: 3,
  /** 구독자 */
  super: 20,
} as const;

/** 등급별 한 달 한도(분). 하루 한도를 매일 채워도 원가가 통제되게 */
export const MONTHLY_MINUTES = {
  free: 10,
  super: 200,
} as const;

/**
 * 응답 길이 상한.
 * 프롬프트로 "짧게 말해라" 라고만 하면 모델이 종종 길게 뱉는다.
 * 출력 오디오가 입력의 2배 단가라 여기서 잘라야 원가가 잡힌다.
 */
export const MAX_RESPONSE_TOKENS = 400;

export type TutorMode =
  | 'freeTalk'
  | 'rolePlay'
  | 'lesson'
  | 'pronunciation'
  | 'review';

export const TUTOR_MODES: TutorMode[] = [
  'freeTalk',
  'rolePlay',
  'lesson',
  'pronunciation',
  'review',
];

/** 상황극 주제 */
export const ROLE_PLAY_SCENES = [
  'cafe',
  'convenienceStore',
  'office',
  'hospital',
  'restaurant',
  'interview',
  'meetingFriend',
  'travel',
] as const;
export type RolePlayScene = (typeof ROLE_PLAY_SCENES)[number];
