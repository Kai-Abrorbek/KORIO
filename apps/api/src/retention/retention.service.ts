import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../users/schemas/user-stats.schema';
import { UsersService } from '../users/users.service';
import { GemPassService } from '../payments/gems/gem-pass.service';
import { ENERGY_CONFIG } from '../energy/energy.constants';
import {
  STREAK_CHEST_EVERY_DAYS,
  STREAK_CHEST_GEMS,
} from '../lessons/economy.const';
import {
  dayKey,
  daysBetween,
  resolveTimezone,
  startOfDay,
} from '../common/date.util';
import {
  CHECKIN_REWARDS,
  COMEBACK,
  DAILY_QUESTS,
  STREAK_FREEZE,
  STREAK_GOALS,
} from './retention.config';

const DAY_MS = 86_400_000;
const STUDIED = {
  $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
};

export type QuestId = 'xp' | 'correct' | 'minutes';
export const QUEST_IDS: QuestId[] = ['xp', 'correct', 'minutes'];

/**
 * 리텐션 장치 한 곳 — 복구펜 · 일일 퀘스트 · 복귀 보상 · 첫 7일 출석 · 연속 목표.
 *
 * 숫자는 전부 retention.config.ts 에 있다. 앱은 summary 응답에 실린 값을 그린다.
 *
 * 보석이 오가는 곳은 전부 **조건부 원자 업데이트**다 — 버튼 연타·두 기기 동시
 * 요청에도 한 번만 들어간다 (에너지·상자와 같은 패턴).
 */
@Injectable()
export class RetentionService {
  private readonly logger = new Logger(RetentionService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserStats.name)
    private readonly statsModel: Model<UserStatsDocument>,
    private readonly usersService: UsersService,
    private readonly gemPass: GemPassService,
  ) {}

  // ─────────────────────────── 요약 ───────────────────────────

  /** 홈 한 번에 — 복구펜 · 퀘스트 · 출석 · 복귀 · XP 부스트 · 연속 목표 */
  async summary(userId: string) {
    // 연속을 먼저 맞춘다 — 복구펜 자동 사용·목표 판정이 여기서 일어난다
    await this.usersService.syncStreak(userId).catch(() => null);

    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    const now = new Date();
    const today = dayKey(now, tz);

    const [quests, comeback] = await Promise.all([
      this.questsFor(me, tz, today),
      this.comebackFor(me, tz, now),
    ]);

    return {
      gems: me.gems ?? 0,
      streak: me.streak ?? 0,
      freeze: this.freezeView(me),
      quests,
      checkin: this.checkinView(me, today),
      comeback,
      xpBoost:
        me.xpBoostUntil && new Date(me.xpBoostUntil) > now
          ? {
              until: new Date(me.xpBoostUntil).toISOString(),
              multiplier: COMEBACK.XP_MULTIPLIER,
            }
          : null,
      streakGoal: this.goalView(me),
    };
  }

  // ─────────────────────────── 복구펜 ───────────────────────────

  private freezeView(me: User) {
    const notice = me.streakFreezeNotice;
    return {
      owned: Math.max(0, me.streakFreeze ?? 0),
      max: STREAK_FREEZE.MAX_HOLD,
      price: STREAK_FREEZE.PRICE_GEMS,
      superWeekly: STREAK_FREEZE.SUPER_WEEKLY,
      /** 자동으로 썼다는 알림 (앱이 한 번 보여주고 ack) */
      notice: notice?.used
        ? { used: notice.used, at: new Date(notice.at).toISOString() }
        : null,
    };
  }

  /** 보석으로 복구펜 1개. 잔액·보유 상한을 조건으로 건다 */
  async buyFreeze(userId: string) {
    const uid = new Types.ObjectId(userId);
    const updated = await this.userModel
      .findOneAndUpdate(
        {
          _id: uid,
          gems: { $gte: STREAK_FREEZE.PRICE_GEMS },
          $expr: {
            $lt: [{ $ifNull: ['$streakFreeze', 0] }, STREAK_FREEZE.MAX_HOLD],
          },
        },
        {
          $inc: { gems: -STREAK_FREEZE.PRICE_GEMS, streakFreeze: 1 },
        },
        { returnDocument: 'after' },
      )
      .select('gems streakFreeze')
      .lean();

    if (!updated) {
      const me = await this.findMe(userId);
      if ((me.streakFreeze ?? 0) >= STREAK_FREEZE.MAX_HOLD) {
        throw new BadRequestException('FREEZE_MAX');
      }
      throw new BadRequestException('NOT_ENOUGH_GEMS');
    }
    return {
      gems: updated.gems ?? 0,
      owned: updated.streakFreeze ?? 0,
      max: STREAK_FREEZE.MAX_HOLD,
    };
  }

  async ackFreezeNotice(userId: string) {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { streakFreezeNotice: null } },
    );
    return { success: true };
  }

  // ─────────────────────────── 일일 퀘스트 ───────────────────────────

  /**
   * 진행도는 따로 세지 않는다 — 그날의 학습 통계(UserStats)를 읽는다.
   * 어떤 모드로 공부하든 recordStudy·grantXp 가 이미 쌓고 있다.
   */
  private async questsFor(
    me: User & { _id: Types.ObjectId },
    tz: string,
    today: string,
  ) {
    const row = await this.statsModel
      .findOne({ userId: me._id, date: startOfDay(new Date(), tz) })
      .select('xpEarned correctQuestions studyTimeSeconds')
      .lean();

    const minutesTarget = Math.min(
      DAILY_QUESTS.MINUTES_MAX,
      Math.max(
        DAILY_QUESTS.MINUTES_MIN,
        me.dailyGoalMinutes || DAILY_QUESTS.MINUTES_DEFAULT,
      ),
    );
    const raw: Record<QuestId, { target: number; progress: number }> = {
      xp: { target: DAILY_QUESTS.XP_TARGET, progress: row?.xpEarned ?? 0 },
      correct: {
        target: DAILY_QUESTS.CORRECT_TARGET,
        progress: row?.correctQuestions ?? 0,
      },
      minutes: {
        target: minutesTarget,
        progress: Math.floor((row?.studyTimeSeconds ?? 0) / 60),
      },
    };
    const claimed =
      me.dailyQuestState?.day === today
        ? (me.dailyQuestState.claimed ?? [])
        : [];

    const items = QUEST_IDS.map((id) => {
      const { target, progress } = raw[id];
      return {
        id,
        target,
        progress: Math.min(target, Math.max(0, progress)),
        done: progress >= target,
        claimed: claimed.includes(id),
        gems: DAILY_QUESTS.QUEST_GEMS,
      };
    });

    return {
      day: today,
      items,
      chest: {
        gems: DAILY_QUESTS.CHEST_GEMS,
        ready: items.every((q) => q.done),
        claimed: claimed.includes('chest'),
      },
    };
  }

  /** 퀘스트 보상 받기 (id = xp | correct | minutes | chest) */
  async claimQuest(userId: string, id: string) {
    const isChest = id === 'chest';
    if (!isChest && !QUEST_IDS.includes(id as QuestId)) {
      throw new BadRequestException('UNKNOWN_QUEST');
    }

    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    const today = dayKey(new Date(), tz);
    const quests = await this.questsFor(me, tz, today);

    const ready = isChest
      ? quests.chest.ready
      : quests.items.find((q) => q.id === id)?.done;
    if (!ready) throw new BadRequestException('QUEST_NOT_DONE');

    const reward = isChest ? DAILY_QUESTS.CHEST_GEMS : DAILY_QUESTS.QUEST_GEMS;
    const sameDay = { $eq: ['$dailyQuestState.day', today] };

    // 오늘 이미 받았으면 조건에서 걸린다 (연타·두 기기)
    const updated = await this.userModel
      .findOneAndUpdate(
        {
          _id: me._id,
          $nor: [
            { 'dailyQuestState.day': today, 'dailyQuestState.claimed': id },
          ],
        },
        [
          {
            $set: {
              dailyQuestState: {
                day: today,
                claimed: {
                  $cond: [
                    sameDay,
                    {
                      $concatArrays: [
                        { $ifNull: ['$dailyQuestState.claimed', []] },
                        [id],
                      ],
                    },
                    [id],
                  ],
                },
              },
              gems: { $add: [{ $ifNull: ['$gems', 0] }, reward] },
            },
          },
        ],
        { returnDocument: 'after', updatePipeline: true },
      )
      .select('gems')
      .lean();

    if (!updated) throw new BadRequestException('QUEST_ALREADY_CLAIMED');
    return { gems: updated.gems ?? 0, reward };
  }

  // ─────────────────────────── 복귀 보상 ───────────────────────────

  /**
   * 며칠 쉬다 온 사람에게 — 에너지 가득 + 잠깐 XP 배수.
   * 한 번도 공부 안 한 신규는 대상이 아니다 (첫 7일 출석이 맡는다).
   */
  private async comebackFor(
    me: User & { _id: Types.ObjectId },
    tz: string,
    now: Date,
  ) {
    if (
      me.comebackClaimedAt &&
      now.getTime() - new Date(me.comebackClaimedAt).getTime() <
        COMEBACK.COOLDOWN_DAYS * DAY_MS
    ) {
      return null;
    }
    const last = await this.statsModel
      .findOne({ userId: me._id, ...STUDIED })
      .sort({ date: -1 })
      .select('date')
      .lean();
    if (!last) return null;

    const idleDays = daysBetween(
      startOfDay(last.date, tz),
      startOfDay(now, tz),
    );
    if (idleDays < COMEBACK.IDLE_DAYS) return null;

    return {
      idleDays,
      energy: ENERGY_CONFIG.MAX,
      boostMinutes: COMEBACK.BOOST_MINUTES,
      multiplier: COMEBACK.XP_MULTIPLIER,
    };
  }

  async claimComeback(userId: string) {
    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    const now = new Date();
    const offer = await this.comebackFor(me, tz, now);
    if (!offer) throw new BadRequestException('COMEBACK_NOT_AVAILABLE');

    const boostUntil = new Date(
      now.getTime() + COMEBACK.BOOST_MINUTES * 60_000,
    );
    const cooldownEdge = new Date(
      now.getTime() - COMEBACK.COOLDOWN_DAYS * DAY_MS,
    );
    const res = await this.userModel.updateOne(
      {
        _id: me._id,
        $or: [
          { comebackClaimedAt: null },
          { comebackClaimedAt: { $lte: cooldownEdge } },
        ],
      },
      {
        $set: {
          comebackClaimedAt: now,
          xpBoostUntil: boostUntil,
          energy: ENERGY_CONFIG.MAX,
          energyUpdatedAt: now,
        },
      },
    );
    if (!res.modifiedCount) {
      throw new BadRequestException('COMEBACK_NOT_AVAILABLE');
    }
    return {
      energy: ENERGY_CONFIG.MAX,
      xpBoost: {
        until: boostUntil.toISOString(),
        multiplier: COMEBACK.XP_MULTIPLIER,
      },
    };
  }

  // ─────────────────────────── 첫 7일 출석 ───────────────────────────

  /** 7번 다 받으면 null — 홈에서 카드가 사라진다 */
  private checkinView(me: User, today: string) {
    const count = Math.max(0, me.checkin?.count ?? 0);
    if (count >= CHECKIN_REWARDS.length) return null;
    return {
      /** 지금까지 받은 횟수 */
      count,
      /** 오늘 받을 수 있나 (하루 한 번) */
      canClaim: me.checkin?.lastDay !== today,
      rewards: CHECKIN_REWARDS.map((r, i) => ({
        day: i + 1,
        gems: r.gems,
        superDays: r.superDays ?? 0,
      })),
    };
  }

  async claimCheckin(userId: string) {
    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    const today = dayKey(new Date(), tz);
    const count = Math.max(0, me.checkin?.count ?? 0);
    if (count >= CHECKIN_REWARDS.length) {
      throw new BadRequestException('CHECKIN_DONE');
    }
    const reward = CHECKIN_REWARDS[count];

    // 횟수·날짜를 조건으로 — 같은 날 두 번, 같은 칸 두 번을 막는다
    const res = await this.userModel.updateOne(
      {
        _id: me._id,
        $and: [
          count === 0
            ? { $or: [{ checkin: null }, { 'checkin.count': 0 }] }
            : { 'checkin.count': count },
          { 'checkin.lastDay': { $ne: today } },
        ],
      },
      {
        $set: { checkin: { count: count + 1, lastDay: today } },
        ...(reward.gems ? { $inc: { gems: reward.gems } } : {}),
      },
    );
    if (!res.modifiedCount) throw new BadRequestException('CHECKIN_ALREADY');

    let superGranted = false;
    if (reward.superDays) {
      try {
        superGranted = await this.gemPass.grantRewardDays(
          userId,
          reward.superDays,
          `checkin${count + 1}`,
        );
      } catch (error) {
        // 프리미엄을 못 줬으면 출석 칸을 되돌린다 — 다시 누르면 받을 수 있게
        await this.userModel
          .updateOne(
            { _id: me._id, 'checkin.count': count + 1 },
            {
              $set: { checkin: me.checkin ?? null },
              ...(reward.gems ? { $inc: { gems: -reward.gems } } : {}),
            },
          )
          .catch(() => undefined);
        this.logger.error(
          `출석 프리미엄 지급 실패: user=${userId} ${String(error)}`,
        );
        throw new BadRequestException('CHECKIN_FAILED');
      }
    }

    const after = await this.userModel
      .findById(me._id)
      .select('gems isSuper superExpiresAt superTier')
      .lean();
    return {
      day: count + 1,
      gems: after?.gems ?? 0,
      reward: { gems: reward.gems, superDays: reward.superDays ?? 0 },
      superGranted,
    };
  }

  // ─────────────────────────── 연속 목표 ───────────────────────────

  private goalView(me: User) {
    const g = me.streakGoal;
    return {
      options: STREAK_GOALS,
      /** 연속 N일째마다 받는 상자 — "이렇게 이어가면 이만큼" 표에 쓴다 */
      streakChest: {
        everyDays: STREAK_CHEST_EVERY_DAYS,
        gems: STREAK_CHEST_GEMS,
      },
      active:
        g?.status === 'active'
          ? {
              days: g.days,
              gems: g.gems,
              progress: g.progress ?? 0,
              startDay: new Date(g.startDay).toISOString(),
            }
          : null,
      /** 끝났는데 아직 결과를 안 보여준 목표 */
      result:
        g && g.status !== 'active' && g.seen === false
          ? {
              status: g.status,
              days: g.days,
              gems: g.gems,
              progress: g.progress ?? 0,
            }
          : null,
    };
  }

  async getGoal(userId: string) {
    await this.usersService.syncStreak(userId).catch(() => null);
    const me = await this.findMe(userId);
    return {
      gems: me.gems ?? 0,
      streak: me.streak ?? 0,
      freeze: this.freezeView(me),
      ...this.goalView(me),
    };
  }

  /** 목표를 고르면 즉시 보석. 진행 중인 목표가 있으면 못 고른다 */
  async startGoal(userId: string, days: number) {
    const option = STREAK_GOALS.find((o) => o.days === Number(days));
    if (!option) throw new BadRequestException('UNKNOWN_GOAL');

    // 진행 중이던 목표가 사실 이미 끝났을 수 있다 — 먼저 판정
    await this.usersService.syncStreak(userId).catch(() => null);
    const me = await this.findMe(userId);
    if (me.streakGoal?.status === 'active') {
      throw new BadRequestException('GOAL_ACTIVE');
    }

    const tz = resolveTimezone(me.timezone);
    const now = new Date();
    const res = await this.userModel.updateOne(
      {
        _id: me._id,
        $or: [{ streakGoal: null }, { 'streakGoal.status': { $ne: 'active' } }],
      },
      {
        $set: {
          streakGoal: {
            days: option.days,
            gems: option.gems,
            startDay: startOfDay(now, tz),
            startedAt: now,
            status: 'active',
            progress: 0,
            endedAt: null,
            seen: true,
          },
        },
        $inc: { gems: option.gems },
      },
    );
    if (!res.modifiedCount) throw new BadRequestException('GOAL_ACTIVE');

    // 오늘 이미 공부했으면 바로 1일로 잡히게
    await this.usersService.syncStreak(userId).catch(() => null);
    return this.getGoal(userId);
  }

  /** 끝난 목표 결과를 봤다 */
  async ackGoal(userId: string) {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId), 'streakGoal.seen': false },
      { $set: { 'streakGoal.seen': true } },
    );
    return { success: true };
  }

  // ─────────────────────────── 내부 ───────────────────────────

  private async findMe(userId: string) {
    const me = await this.userModel
      .findById(new Types.ObjectId(userId))
      .select(
        'timezone gems streak streakFreeze streakFreezeNotice dailyQuestState dailyGoalMinutes comebackClaimedAt xpBoostUntil checkin streakGoal',
      )
      .lean();
    if (!me) throw new NotFoundException('USER_NOT_FOUND');
    return me as User & { _id: Types.ObjectId };
  }
}
