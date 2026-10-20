import type { Types } from 'mongoose';
import { daysBetween, startOfDay } from '../common/date.util';
import { MAX_GAP_DAYS } from '../users/utils/streak.util';
import { COMEBACK_CADENCE, comebackStep } from './push-copy';
import { PushType } from './push.types';

/**
 * "지금 이 사람에게 무엇을 보낼 것인가" — DB 를 안 보는 순수 규칙.
 *
 * 서비스 안에 박혀 있으면 검증할 방법이 없고, 검증 안 되는 규칙은 조용히
 * 틀린다 (리그 애니메이션이 그랬다). 그래서 따로 떼어 스펙으로 묶는다.
 */

/** 이 시간대 밖으로는 절대 안 보낸다 (유저 로컬 시각) */
export const QUIET_END_HOUR = 8; // 이 시각부터 보낼 수 있음
export const QUIET_START_HOUR = 22; // 이 시각부터 다시 조용

/** 학습 시간을 안 정해둔 사람의 기본 슬롯 */
const DEFAULT_DAILY_HOUR = 20;
/** 두 번째(재미 유도) 슬롯 — 첫 슬롯과 최대한 떨어뜨린다 */
const MIDDAY_SLOT = 12;
const EVENING_SLOT = 20;

/** 연속 n일이 이보다 작으면 연속 문구를 안 쓴다 ("1일 연속 기록을 잃지 마세요" 는 어색하다) */
export const STREAK_COPY_MIN = 2;

export interface SlotDecision {
  type: PushType;
  params?: Record<string, any>;
  link: string;
  /** dedupKey 앞부분. 뒤에 날짜가 붙는다 */
  dedupPrefix: string;
  /** 문구 고르는 값 (복귀 알림 단계 안에서 몇 번째 줄인지) */
  rotation: number;
}

export interface EngagementInput {
  /** 유저 로컬 시각 (0~23) */
  hour: number;
  reminderHour?: number;
  studyMode?: string;
  /** 마지막으로 저장된 연속 일수 — 앱을 안 열면 안 바뀌므로 끊긴 다음 날에도 끊기기 전 값이다 */
  streak?: number;
  /** 마지막 학습일로부터 며칠. 0 = 오늘 함, null = 한 번도 안 함 */
  idleDays: number | null;
  /** 연속 판정 기준으로 며칠 — 복구펜으로 메운 날까지 친 마지막 날부터. 없으면 idleDays */
  streakIdleDays?: number | null;
  /** 가진 복구펜 수 — 앱을 열면 모자란 날을 자동으로 메운다 */
  streakFreeze?: number;
  /** 가입 후 며칠 — 한 번도 안 한 사람(idleDays null)의 단계를 정한다 */
  signupDays?: number | null;
  nickname?: string;
  targetLanguage?: string;
}

/** 본인 학습 시각 슬롯과 재미 유도 슬롯 */
export function slotsOf(reminderHour?: number) {
  const reminder = clampSlot(reminderHour ?? DEFAULT_DAILY_HOUR);
  // 두 슬롯이 붙어 있으면 "하루 두 번" 이 아니라 "두 번 연속" 이 된다
  const engage = reminder >= 15 ? MIDDAY_SLOT : EVENING_SLOT;
  return { reminder, engage };
}

/** 오래 쉰 사람은 덜 부른다 — 문구가 "하루 한 번만", "일주일에 한 번만" 이라고 말한 대로 */
export function sendsPerDay(away: number): 1 | 2 {
  return away >= COMEBACK_CADENCE.ONCE_A_DAY_FROM ? 1 : 2;
}

function sendsToday(away: number): boolean {
  if (away < COMEBACK_CADENCE.WEEKLY_FROM) return true;
  return (away - COMEBACK_CADENCE.WEEKLY_FROM) % 7 === 0;
}

/**
 * 한 슬롯에서 나가는 건 언제나 **한 건**이다.
 *
 * 우선순위: 연속 마지막 기회 → 연속 끊긴 다음 날 → 학습 로드 재촉 → 학습 시간 → 재미 유도.
 * 연속 두 개 말고는 같은 복귀 문구(쉰 날짜별 단계)를 쓰고, 종류는 눌렀을 때 갈 곳과
 * 설정 스위치를 정한다.
 */
export function decideEngagement(input: EngagementInput): SlotDecision | null {
  const { hour, idleDays } = input;

  // 새벽에 울리는 알림은 알림이 아니라 사고다
  if (hour < QUIET_END_HOUR || hour >= QUIET_START_HOUR) return null;

  // 오늘 이미 공부한 사람은 부르지 않는다.
  // "5분만 시간 내주실래요?" 를 방금 3레슨 푼 사람에게 보내면 안 읽힌다.
  if (idleDays === 0) return null;

  const { reminder, engage } = slotsOf(input.reminderHour);
  const isReminderSlot = hour === reminder;
  if (!isReminderSlot && hour !== engage) return null;

  const studiedBefore = idleDays !== null;
  // 한 번도 안 한 사람은 가입한 날부터 센다 (안 그러면 하루 2번이 영원히 간다)
  const away = studiedBefore ? idleDays : Math.max(0, input.signupDays ?? 0);

  const perDay = sendsPerDay(away);
  // 하루 1번이 되면 본인이 정한 시각에만
  if (perDay === 1 && !isReminderSlot) return null;
  if (!sendsToday(away)) return null;

  const slot: 0 | 1 =
    perDay === 1 || hour === Math.min(reminder, engage) ? 0 : 1;
  const isLastSlot = perDay === 1 || slot === 1;

  // ── 연속 학습 ──
  // 복구펜은 앱을 열 때 모자란 날을 메운다(planStreakFreeze). 가진 펜으로 다 못 메우면
  // 한 장도 안 쓰고 끊긴다. 그래서 "펜이 메워야 할 날 수" 가 펜 수와 같은 날이 마지막
  // 기회, 하나 넘친 날이 끊긴 다음 날이다. 펜이 없으면 각각 2일째, 3일째.
  const streak = input.streak ?? 0;
  const streakIdle = input.streakIdleDays ?? idleDays;
  if (studiedBefore && streak >= STREAK_COPY_MIN && streakIdle !== null) {
    const pens = Math.max(0, input.streakFreeze ?? 0);
    const short = streakIdle - MAX_GAP_DAYS;
    // 가장 센 카드라 그날 마지막 슬롯에서 한 번만
    if (short === pens && isLastSlot) {
      return {
        type: PushType.STREAK_RISK,
        params: { streak },
        link: '/(tabs)',
        dedupPrefix: 'streak_risk',
        rotation: 0,
      };
    }
    // "어제 … 오늘은 잊지 말고" — 아침에 가까운 첫 슬롯에서
    if (short === pens + 1 && slot === 0) {
      return {
        type: PushType.STREAK_LOST,
        params: { streak },
        link: '/(tabs)',
        dedupPrefix: 'streak_lost',
        rotation: 0,
      };
    }
  }

  const params = {
    idleDays: away,
    studiedBefore,
    nickname: input.nickname,
    targetLanguage: input.targetLanguage,
  };
  const rotation = comebackStep(away, slot);

  // 학습 로드를 타던 사람이 며칠째 안 옴 → 눌렀을 때 로드로
  if (input.studyMode === 'guided' && studiedBefore && away >= 2) {
    return {
      type: PushType.GUIDED_IDLE,
      params,
      link: '/study-path',
      dedupPrefix: 'guided_idle',
      rotation,
    };
  }

  // 본인이 정해둔 학습 시간
  if (isReminderSlot) {
    return {
      type: PushType.DAILY_REMINDER,
      params,
      link: '/(tabs)',
      dedupPrefix: 'daily',
      rotation,
    };
  }

  // 그 외 — 재미로 끌어당기는 쪽
  return {
    type: PushType.ENGAGE,
    params,
    link: '/(tabs)',
    dedupPrefix: 'engage',
    rotation,
  };
}

/** 조용한 시간대로 설정된 슬롯을 안전한 시각으로 끌어온다 */
function clampSlot(hour: number): number {
  if (!Number.isFinite(hour)) return DEFAULT_DAILY_HOUR;
  const h = Math.floor(hour);
  if (h < QUIET_END_HOUR || h >= QUIET_START_HOUR) return DEFAULT_DAILY_HOUR;
  return h;
}

export interface EngagementUser {
  _id: Types.ObjectId;
  timezone?: string;
  reminderHour?: number;
  studyMode?: string;
  streak?: number;
  streakFreeze?: number;
  streakFrozenDays?: Date[];
  nickname?: string;
  targetLanguage?: string;
  createdAt?: Date;
  superPlan?: string | null;
  superExpiresAt?: Date | null;
}

/**
 * 유저 문서 + 마지막 학습일 → 규칙 입력 (시각 빼고).
 *
 * 연속은 복구펜으로 메운 날도 이어진 날이라, 연속 판정용 "쉰 날" 은 공부한 날과
 * 메운 날 중 늦은 쪽부터 센다. 앱을 열어 펜이 쓰였으면 그만큼 뒤로 밀린다.
 */
export function engagementState(
  user: EngagementUser,
  last: Date | undefined,
  tz: string,
  today: Date,
): Omit<EngagementInput, 'hour'> {
  const idleDays = last ? daysBetween(startOfDay(last, tz), today) : null;
  let streakIdleDays = idleDays;
  if (last) {
    const lastFrozen = (user.streakFrozenDays ?? [])
      .map((d) => new Date(d).getTime())
      .filter((t) => Number.isFinite(t))
      .reduce((a, b) => Math.max(a, b), 0);
    const anchor = Math.max(new Date(last).getTime(), lastFrozen);
    streakIdleDays = daysBetween(startOfDay(anchor, tz), today);
  }
  return {
    reminderHour: user.reminderHour,
    studyMode: user.studyMode,
    streak: user.streak,
    idleDays,
    streakIdleDays,
    streakFreeze: user.streakFreeze,
    signupDays: user.createdAt
      ? Math.max(0, daysBetween(startOfDay(user.createdAt, tz), today))
      : null,
    nickname: user.nickname,
    targetLanguage: user.targetLanguage,
  };
}

/**
 * 시간 기반 푸시를 모두 여기서 낸다.
 *
 * 왜 크론이 하나인가: 유저마다 시간대가 달라서 "한국 20시" 같은 고정 시각이
 * 의미가 없다. 매시 정각에 한 번 훑으면서 **그 사람의 로컬 시각**이 슬롯과
 * 맞는지 본다. 종류별로 크론을 따로 두면 같은 스캔을 네 번 돌게 된다.
 *
 * 그리고 한 슬롯에서는 **한 건만** 나간다. 학습 알림·재미 유도·로드학습
 * 재촉이 각자 나가면 하루에 네 번 울리고, 그 앱은 지워진다. 슬롯마다
 * 그 사람에게 지금 가장 맞는 문구 하나를 골라서 보낸다.
 */
