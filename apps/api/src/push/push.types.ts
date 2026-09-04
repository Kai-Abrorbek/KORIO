/**
 * 푸시 종류.
 *
 * 문구는 서버가 만든다 — 앱이 꺼져 있을 때 보내는 것이라 앱의 i18n 을 쓸 수 없다.
 * 유저 언어(appLanguage)를 보고 push-copy.ts 에서 고른다.
 */
export enum PushType {
  /** 누가 나를 팔로우 */
  FOLLOW = 'follow',
  /** 유저가 정해둔 시간의 학습 알림 */
  DAILY_REMINDER = 'daily_reminder',
  /** 재미로 끌어당기는 유도 알림 (하루 슬롯 중 하나) */
  ENGAGE = 'engage',
  /** 연속학습이 오늘 끊길 위험 */
  STREAK_RISK = 'streak_risk',
  /** 학습 로드(guided) 진행 중인데 며칠째 안 함 */
  GUIDED_IDLE = 'guided_idle',
  /** 구독·체험 종료 임박 */
  TRIAL_ENDING = 'trial_ending',
  /** 리그 승급 */
  LEAGUE_PROMOTED = 'league_promoted',
  /** 리그 강등 */
  LEAGUE_DEMOTED = 'league_demoted',
  /** 리그 정산(유지) */
  LEAGUE_RESULT = 'league_result',
  /** 에너지 가득 참 */
  ENERGY_FULL = 'energy_full',
  /** 어드민 공지 — 신규 기능 안내 등 */
  ANNOUNCEMENT = 'announcement',
}

/**
 * 발송 성격.
 *
 *  transactional — 유저 행동에 대한 응답이거나 돈이 걸린 것. 한도를 안 먹는다.
 *  engagement    — 우리가 부르는 것. 하루 한도 안에서만 나간다.
 *
 * 이 구분이 없으면 "재미있는 유도 알림 2번 + 학습 알림 + 로드학습 재촉" 이
 * 전부 따로 나가서 하루에 네 번 울린다. 그 앱은 지워진다.
 */
export const ENGAGEMENT_TYPES: ReadonlySet<PushType> = new Set([
  PushType.DAILY_REMINDER,
  PushType.ENGAGE,
  PushType.STREAK_RISK,
  PushType.GUIDED_IDLE,
]);

export function isEngagement(type: PushType): boolean {
  return ENGAGEMENT_TYPES.has(type);
}

/** 하루에 보낼 수 있는 engagement 푸시 최대 개수 (유저 1명 기준) */
export const ENGAGEMENT_DAILY_MAX = 2;

/**
 * 설정 화면의 어느 스위치가 이 푸시를 막는지.
 * 스위치가 꺼져 있으면 보내지 않는다. 매핑이 없으면 master 만 본다.
 */
export const PREF_KEY_OF: Partial<Record<PushType, PushPrefKey>> = {
  [PushType.FOLLOW]: 'friends',
  [PushType.DAILY_REMINDER]: 'daily',
  [PushType.ENGAGE]: 'daily',
  [PushType.STREAK_RISK]: 'streak',
  [PushType.GUIDED_IDLE]: 'daily',
  [PushType.LEAGUE_PROMOTED]: 'league',
  [PushType.LEAGUE_DEMOTED]: 'league',
  [PushType.LEAGUE_RESULT]: 'league',
  [PushType.ANNOUNCEMENT]: 'events',
  // TRIAL_ENDING / ENERGY_FULL 은 스위치로 못 끈다.
  // 돈이 빠져나가는 안내를 유저가 모르게 두면 그게 더 큰 사고다.
};

export type PushPrefKey =
  | 'daily'
  | 'streak'
  | 'league'
  | 'friends'
  | 'events';

/** 앱이 지원하는 언어. 유저 언어를 모르면 기본값. */
export type PushLang = 'ko' | 'uz' | 'en' | 'ru';
export const PUSH_LANGS: PushLang[] = ['ko', 'uz', 'en', 'ru'];
export const DEFAULT_PUSH_LANG: PushLang = 'uz';

export function resolvePushLang(raw?: string | null): PushLang {
  const v = (raw ?? '').slice(0, 2).toLowerCase() as PushLang;
  return PUSH_LANGS.includes(v) ? v : DEFAULT_PUSH_LANG;
}

/** 실제로 기기에 보낼 한 건 */
export interface PushMessage {
  title: string;
  body: string;
  /** 눌렀을 때 갈 앱 내 경로 */
  link?: string;
  data?: Record<string, any>;
}
