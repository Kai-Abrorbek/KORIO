import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../users/schemas/user-stats.schema';
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
import {
  QUIET_END_HOUR,
  QUIET_START_HOUR,
  decideEngagement,
  engagementState,
  slotsOf,
  type EngagementUser,
} from './push-engagement';

/** 체험 종료 안내를 보내는 로컬 시각 */
const TRIAL_HOUR = 10;
/** 체험이 며칠 남았을 때 보내는지. 앱의 TRIAL_REMINDER_DAYS 와 같아야 한다 */
const TRIAL_REMIND_DAYS = [3, 1];

/** 한 번에 훑을 유저 수 */
const BATCH = 300;

/** 규칙에 필요한 유저 필드 — 크론과 미리보기가 같은 걸 읽는다 */
const USER_FIELDS =
  'timezone reminderHour studyMode streak streakFreeze streakFrozenDays nickname targetLanguage createdAt superPlan superExpiresAt';

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
      .select(USER_FIELDS)
      .lean<EngagementUser>();
    if (!user) return { error: 'USER_NOT_FOUND' };

    const tz = resolveTimezone(user.timezone);
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
    const state = engagementState(user, last, tz, today);

    const hour = hourOverride ?? hourIn(now, tz);
    const decision = decideEngagement({ ...state, hour });

    // 하루 전체를 한눈에 — 몇 시에 뭐가 나가는지
    const timeline: { hour: number; type: string }[] = [];
    for (let h = 0; h < 24; h++) {
      const d = decideEngagement({ ...state, hour: h });
      if (d) timeline.push({ hour: h, type: d.type });
    }

    return {
      now: { localHour: hourIn(now, tz), timezone: tz },
      checkedHour: hour,
      slots: slotsOf(user.reminderHour),
      state: {
        lastStudy: last ?? null,
        idleDays: state.idleDays,
        streakIdleDays: state.streakIdleDays,
        signupDays: state.signupDays,
        streak: user.streak ?? 0,
        streakFreeze: user.streakFreeze ?? 0,
        studyMode: user.studyMode ?? null,
        superPlan: user.superPlan ?? null,
        superExpiresAt: user.superExpiresAt ?? null,
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

  /**
   * 영수증 확인 — 재설치로 죽은 토큰을 걸러내고, FCM 키 문제를 로그로 드러낸다.
   * blue/green 두 컨테이너가 같이 돌아도 결과가 같아서(멱등) 잠금은 안 건다.
   */
  @Cron('*/15 * * * *')
  async receipts() {
    if (isShuttingDown()) return;
    await this.push.checkReceipts().catch((e) =>
      this.logger.warn(`영수증 확인 실패: ${(e as Error).message}`),
    );
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
      .select(USER_FIELDS)
      .lean<EngagementUser[]>();
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
        if (await this.handleUser(user, lastStudy)) sent++;
      } catch (e) {
        this.logger.warn(
          `푸시 판단 실패 (${String(user._id)}): ${(e as Error).message}`,
        );
      }
    }
    return sent;
  }

  private async handleUser(
    user: EngagementUser,
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
    const decision = decideEngagement({
      ...engagementState(user, last, tz, today),
      hour,
    });
    if (!decision) return false;

    // 문구는 쉰 날짜 단계 안에서 순서대로 (랜덤이면 이틀 연속 같은 문장이 나온다)
    return this.push.send(user._id, decision.type, {
      params: decision.params,
      link: decision.link,
      dedupKey: `${decision.dedupPrefix}:${day}`,
      rotation: decision.rotation,
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
