import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../users/schemas/user-stats.schema';
import { MAX_GAP_DAYS } from '../users/utils/streak.util';
import { isShuttingDown } from '../health/health.controller';
import {
  dayKey,
  daysBetween,
  hourIn,
  resolveTimezone,
  startOfDay,
} from '../common/date.util';
import { PushService } from './push.service';
import { PushType } from './push.types';

/** 이 시간대 밖으로는 절대 안 보낸다 (유저 로컬 시각) */
const QUIET_END_HOUR = 8; // 이 시각부터 보낼 수 있음
const QUIET_START_HOUR = 22; // 이 시각부터 다시 조용

/** 학습 시간을 안 정해둔 사람의 기본 슬롯 */
const DEFAULT_DAILY_HOUR = 20;
/** 두 번째(재미 유도) 슬롯 — 첫 슬롯과 최대한 떨어뜨린다 */
const MIDDAY_SLOT = 12;
const EVENING_SLOT = 20;

/** 체험 종료 안내를 보내는 로컬 시각 */
const TRIAL_HOUR = 10;
/** 체험이 며칠 남았을 때 보내는지. 앱의 TRIAL_REMINDER_DAYS 와 같아야 한다 */
const TRIAL_REMIND_DAYS = [3, 1];

/** 한 번에 훑을 유저 수 */
const BATCH = 300;

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
@Injectable()
export class PushSchedulerService {
  private readonly logger = new Logger(PushSchedulerService.name);

  constructor(
    private readonly push: PushService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(UserStats.name)
    private readonly statsModel: Model<UserStatsDocument>,
  ) {}

  /**
   * 지금(또는 지정한 시각에) 이 사람에게 무엇이 나갈지 — **보내지 않고** 본다.
   *
   * 크론은 매시 정각에 돌고 슬롯 시각이 맞아야 나가서, 그냥 두면 확인하는 데
   * 하루가 걸린다. 확인할 수 없는 규칙은 조용히 틀린다.
   */
  async preview(userId: string, hourOverride?: number) {
    const uid = new Types.ObjectId(userId);
    const user = await this.userModel
      .findById(uid)
      .select('timezone reminderHour studyMode streak superPlan superExpiresAt')
      .lean();
    if (!user) return { error: 'USER_NOT_FOUND' };

    const tz = resolveTimezone((user as any).timezone);
    const now = new Date();
    const today = startOfDay(now, tz);

    const row = await this.statsModel
      .find({
        userId: uid,
        $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
      })
      .select('date')
      .sort({ date: -1 })
      .limit(1)
      .lean();
    const last = row[0]?.date;
    const idleDays = last ? daysBetween(startOfDay(last, tz), today) : null;

    const hour = hourOverride ?? hourIn(now, tz);
    const reminderSlot = clampSlot(
      (user as any).reminderHour ?? DEFAULT_DAILY_HOUR,
    );
    const engageSlot = reminderSlot >= 15 ? MIDDAY_SLOT : EVENING_SLOT;

    const decision = decideEngagement({
      hour,
      reminderHour: (user as any).reminderHour,
      studyMode: (user as any).studyMode,
      streak: (user as any).streak,
      idleDays,
    });

    // 하루 전체를 한눈에 — 몇 시에 뭐가 나가는지
    const timeline: { hour: number; type: string }[] = [];
    for (let h = 0; h < 24; h++) {
      const d = decideEngagement({
        hour: h,
        reminderHour: (user as any).reminderHour,
        studyMode: (user as any).studyMode,
        streak: (user as any).streak,
        idleDays,
      });
      if (d) timeline.push({ hour: h, type: d.type });
    }

    return {
      now: { localHour: hourIn(now, tz), timezone: tz },
      checkedHour: hour,
      slots: { reminder: reminderSlot, engage: engageSlot },
      state: {
        lastStudy: last ?? null,
        idleDays,
        streak: (user as any).streak ?? 0,
        studyMode: (user as any).studyMode ?? null,
        superPlan: (user as any).superPlan ?? null,
        superExpiresAt: (user as any).superExpiresAt ?? null,
      },
      wouldSend: decision,
      todayTimeline: timeline,
    };
  }

  /** 크론을 지금 손으로 돌린다 (어드민). 실제로 발송된다 */
  async runNow() {
    const started = Date.now();
    await this.tick();
    return { ok: true, ms: Date.now() - started };
  }

  @Cron('0 * * * *')
  async tick() {
    // 종료 중인 컨테이너가 마지막으로 한 번 더 도는 걸 막는다
    if (isShuttingDown()) return;

    const ids = await this.push.userIdsWithTokens();
    if (!ids.length) return;

    let sent = 0;
    for (let i = 0; i < ids.length; i += BATCH) {
      sent += await this.runBatch(ids.slice(i, i + BATCH));
    }
    if (sent) this.logger.log(`푸시 ${sent}건 발송 (대상 ${ids.length}명)`);
  }

  private async runBatch(ids: Types.ObjectId[]): Promise<number> {
    const users = await this.userModel
      .find({ _id: { $in: ids }, isBot: { $ne: true } })
      .select(
        'timezone reminderHour reminderEnabled studyMode streak superPlan superExpiresAt',
      )
      .lean();
    if (!users.length) return 0;

    // 마지막 학습일을 한 방에 가져온다. 유저마다 조회하면 N+1 이 된다.
    const rows = await this.statsModel.aggregate<{
      _id: Types.ObjectId;
      last: Date;
    }>([
      {
        $match: {
          userId: { $in: ids },
          $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
        },
      },
      { $group: { _id: '$userId', last: { $max: '$date' } } },
    ]);
    const lastStudy = new Map(rows.map((r) => [r._id.toString(), r.last]));

    let sent = 0;
    for (const user of users) {
      try {
        if (await this.handleUser(user as any, lastStudy)) sent++;
      } catch (e) {
        this.logger.warn(
          `푸시 판단 실패 (${String((user as any)._id)}): ${(e as Error).message}`,
        );
      }
    }
    return sent;
  }

  private async handleUser(
    user: {
      _id: Types.ObjectId;
      timezone?: string;
      reminderHour?: number;
      studyMode?: string;
      streak?: number;
      superPlan?: string | null;
      superExpiresAt?: Date | null;
    },
    lastStudy: Map<string, Date>,
  ): Promise<boolean> {
    const tz = resolveTimezone(user.timezone);
    const now = new Date();
    const hour = hourIn(now, tz);

    // 새벽에 울리는 알림은 알림이 아니라 사고다
    if (hour < QUIET_END_HOUR || hour >= QUIET_START_HOUR) return false;

    const today = startOfDay(now, tz);
    const day = dayKey(now, tz);

    // ── 체험 종료 임박 (한도를 안 먹는 안내) ──
    if (hour === TRIAL_HOUR && (await this.maybeTrialEnding(user, tz, today))) {
      return true;
    }

    // ── engagement 슬롯 ──
    const last = lastStudy.get(user._id.toString());
    const idleDays = last ? daysBetween(startOfDay(last, tz), today) : null;

    const decision = decideEngagement({
      hour,
      reminderHour: user.reminderHour,
      studyMode: user.studyMode,
      streak: user.streak,
      idleDays,
    });
    if (!decision) return false;

    // 문구 변형은 날짜로 돌린다. 랜덤이면 이틀 연속 같은 문장이 나온다.
    const rotation = Math.floor(today.getTime() / 86_400_000);

    return this.push.send(user._id, decision.type, {
      params: decision.params,
      link: decision.link,
      dedupKey: `${decision.dedupPrefix}:${day}`,
      rotation: rotation + decision.rotationShift,
    });
  }

  /**
   * 체험 종료 3일 / 1일 전.
   *
   * 결제 구독(자동갱신)은 여기서 다루지 않는다 — 끝나는 게 아니라 갱신되는
   * 것이라 "종료 임박" 이라고 말하면 거짓말이 된다. 자동갱신을 끈 구독까지
   * 챙기려면 Subscription 컬렉션의 autoRenew 를 봐야 한다 (다음 작업).
   */
  private async maybeTrialEnding(
    user: {
      _id: Types.ObjectId;
      superPlan?: string | null;
      superExpiresAt?: Date | null;
    },
    tz: string,
    today: Date,
  ): Promise<boolean> {
    if (user.superPlan !== 'trial' || !user.superExpiresAt) return false;

    const endsOn = startOfDay(user.superExpiresAt, tz);
    const daysLeft = daysBetween(today, endsOn);
    if (!TRIAL_REMIND_DAYS.includes(daysLeft)) return false;

    return this.push.send(user._id, PushType.TRIAL_ENDING, {
      params: { days: daysLeft },
      link: '/premium',
      // 만료일까지 키에 넣는다. 체험을 다시 받는 일이 생겨도 안 섞인다.
      dedupKey: `trial_ending:${dayKey(endsOn, tz)}:${daysLeft}`,
    });
  }
}

export interface SlotDecision {
  type: PushType;
  params?: Record<string, any>;
  link: string;
  /** dedupKey 앞부분. 뒤에 날짜가 붙는다 */
  dedupPrefix: string;
  /** 같은 날 두 슬롯에서 같은 문장이 안 나오게 밀어주는 값 */
  rotationShift: number;
}

/**
 * "지금 이 사람에게 무엇을 보낼 것인가" 를 정하는 순수 함수.
 *
 * DB 를 안 보게 떼어냈다. 이 판단이 규칙의 전부인데 서비스 안에 박혀 있으면
 * 검증할 방법이 없고, 검증 안 되는 규칙은 조용히 틀린다 (리그 애니메이션이
 * 그랬다). 한 슬롯에서 나가는 건 언제나 **한 건**이다.
 *
 * @param idleDays 마지막 학습일로부터 며칠 지났는지. 0=오늘 함, null=기록 없음
 */
export function decideEngagement(input: {
  hour: number;
  reminderHour?: number;
  studyMode?: string;
  streak?: number;
  idleDays: number | null;
}): SlotDecision | null {
  const { hour, idleDays } = input;

  // 새벽에 울리는 알림은 알림이 아니라 사고다
  if (hour < QUIET_END_HOUR || hour >= QUIET_START_HOUR) return null;

  const reminderSlot = clampSlot(input.reminderHour ?? DEFAULT_DAILY_HOUR);
  // 두 슬롯이 붙어 있으면 "하루 두 번" 이 아니라 "두 번 연속" 이 된다
  const engageSlot = reminderSlot >= 15 ? MIDDAY_SLOT : EVENING_SLOT;
  const isReminderSlot = hour === reminderSlot;
  const isEngageSlot = hour === engageSlot;
  if (!isReminderSlot && !isEngageSlot) return null;

  // 오늘 이미 공부한 사람은 부르지 않는다.
  // "5분만 시간 내주실래요?" 를 방금 3레슨 푼 사람에게 보내면 안 읽힌다.
  if (idleDays === 0) return null;

  const isLastSlot = hour === Math.max(reminderSlot, engageSlot);
  const rotationShift = isReminderSlot ? 0 : 1;

  // 1) 연속학습이 오늘 끊긴다.
  //    calcStreak 이 MAX_GAP_DAYS 까지는 봐주므로 딱 그날이 마지막 기회다.
  //    가장 센 카드라 저녁 슬롯에서 한 번만 쓴다.
  if ((input.streak ?? 0) > 0 && idleDays === MAX_GAP_DAYS && isLastSlot) {
    return {
      type: PushType.STREAK_RISK,
      params: { streak: input.streak },
      link: '/(tabs)',
      dedupPrefix: 'streak_risk',
      rotationShift,
    };
  }

  // 2) 학습 로드를 타던 사람이 며칠째 안 옴
  if (input.studyMode === 'guided' && idleDays !== null && idleDays >= 2) {
    return {
      type: PushType.GUIDED_IDLE,
      params: { days: idleDays },
      link: '/study-path',
      dedupPrefix: 'guided_idle',
      rotationShift,
    };
  }

  // 3) 본인이 정해둔 학습 시간
  if (isReminderSlot) {
    return {
      type: PushType.DAILY_REMINDER,
      link: '/(tabs)',
      dedupPrefix: 'daily',
      rotationShift,
    };
  }

  // 4) 그 외 — 재미로 끌어당기는 쪽
  return {
    type: PushType.ENGAGE,
    link: '/(tabs)',
    dedupPrefix: 'engage',
    rotationShift,
  };
}

/** 조용한 시간대로 설정된 슬롯을 안전한 시각으로 끌어온다 */
function clampSlot(hour: number): number {
  if (!Number.isFinite(hour)) return DEFAULT_DAILY_HOUR;
  const h = Math.floor(hour);
  if (h < QUIET_END_HOUR || h >= QUIET_START_HOUR) return DEFAULT_DAILY_HOUR;
  return h;
}
