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

/**
 * 등급별 한도.
 *
 * ── 숫자를 이렇게 잡은 이유 ──
 * MAX 구독 200,000 UZS / 23,000원 ≈ $16. 스토어 수수료 15% 를 빼면
 * 손에 남는 건 월 **$13.60**.
 *
 *   gpt-realtime-2.1-mini  분당 $0.065  → 손익분기 월 209분
 *   gpt-realtime-2.1(정가) 분당 $0.20   → 손익분기 월  68분
 *
 * 한도를 꽉 채우는 유저는 소수지만, 헤비유저가 바로 그들이다. 최악의 경우에도
 * 흑자가 나야 한다. 월 120분이면 mini 기준 원가 $7.80, 마진 43% 로 안전하다.
 *
 * ⚠️ 정가 모델로 바꾸면 이 한도로는 적자다 ($24 원가 vs $13.60 수입).
 *    모델을 올리려면 MAX 월 한도를 60분 이하로 같이 내려야 한다.
 *
 * super 와 free 에 조금 열어두는 건 맛보기다 — 써봐야 MAX 로 올라온다.
 */
export const DAILY_MINUTES = {
  /** 무료: 맛보기 */
  free: 2,
  /** 기존 프리미엄: 맛보기 + 더 쓰려면 MAX */
  super: 5,
  /** 튜터를 위해 만든 등급 */
  max: 20,
} as const;

/** 등급별 한 달 한도(분). 하루 한도를 매일 채워도 원가가 통제되게 */
export const MONTHLY_MINUTES = {
  free: 5,
  super: 20,
  max: 120,
} as const;

export type TutorTier = keyof typeof DAILY_MINUTES;

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

/**
 * Realtime 목소리 10종.
 *
 * ⚠️ 알아둘 것: 이 목소리들은 영어 우선으로 만들어졌다. 우리가 TTS 에 쓰는
 * Azure ko-KR 목소리처럼 한국어 전용으로 훈련된 게 아니라서 한국어 발음이
 * 그만큼 정확하지 않다. 목소리를 바꿔 개선할 수 있는 폭에는 한계가 있다.
 * (공식 권장은 marin / cedar)
 *
 * 발음을 정확히 들려줘야 하는 자리 — "따라 해보세요" 예문 — 는 이걸로
 * 해결되지 않는다. 거기는 기존 Azure TTS 를 써야 한다.
 */
export const TUTOR_VOICES = [
  'marin',
  'cedar',
  'alloy',
  'ash',
  'ballad',
  'coral',
  'echo',
  'sage',
  'shimmer',
  'verse',
] as const;

export type TutorVoice = (typeof TUTOR_VOICES)[number];

export const DEFAULT_TUTOR_VOICE: TutorVoice =
  (process.env.OPENAI_REALTIME_VOICE?.trim() as TutorVoice) || 'marin';

export function resolveVoice(requested?: string): TutorVoice {
  // 세션이 시작된 뒤에는 목소리를 못 바꾼다. 발급 시점에 확정한다.
  return TUTOR_VOICES.includes(requested as TutorVoice)
    ? (requested as TutorVoice)
    : DEFAULT_TUTOR_VOICE;
}

// ── 세션 분석 (Phase 3) ──

/**
 * 대화가 끝난 뒤 요약을 뽑는 모델.
 *
 * Realtime 이 아니라 일반 텍스트 모델이다. 10분 대화 전체를 넣어도 1센트가
 * 안 나온다 — 통화 자체가 훨씬 비싸서 여기서 아낄 이유가 없다.
 */
export const ANALYSIS_MODEL =
  process.env.OPENAI_ANALYSIS_MODEL?.trim() || 'gpt-4o-mini';

/**
 * 분석에 넣을 대화의 상한.
 *
 * 클라가 보내는 값이라 반드시 서버에서 자른다. 프롬프트 길이가 곧 비용이고,
 * 무엇보다 이걸 안 자르면 남이 우리 계정으로 긴 텍스트를 돌릴 수 있다.
 */
export const MAX_TRANSCRIPT_TURNS = 100;
export const MAX_TRANSCRIPT_CHARS = 8000;
/** 한 마디 길이. 본문 크기 상한(64kb)에 걸리지 않게 잡은 값이다 */
export const MAX_TRANSCRIPT_TURN_CHARS = 300;

/**
 * 이보다 짧은 대화는 분석하지 않는다.
 * 30초짜리 인사만 하고 끊은 걸 요약해봐야 "안녕하세요를 말했어요" 밖에 안 나온다.
 * 빈 카드를 보여주느니 안 보여주는 게 낫다.
 */
export const MIN_ANALYZE_SEC = 45;

/** 분석이 늦어져도 종료 응답을 붙잡지 않는다 */
export const ANALYSIS_TIMEOUT_MS = 20000;

/**
 * 실수 분류.
 *
 * 자유 서술로 두면 매번 다른 말이 나와서 "이 사람의 약점"을 집계할 수 없다.
 * 고정된 목록이라야 다음 세션 프롬프트에 "조사를 자주 틀린다" 라고 넣을 수 있다.
 */
export const MISTAKE_TYPES = [
  'particle',
  'ending',
  'vocabulary',
  'wordOrder',
  'honorific',
  'tense',
  'pronunciation',
  'other',
] as const;
export type MistakeType = (typeof MISTAKE_TYPES)[number];

/** 다음 세션 개인화에 쓸 과거 세션 개수 */
export const RECENT_SESSIONS_FOR_CONTEXT = 5;
