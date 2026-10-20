import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { GemLedgerService } from '../gem-ledger/gem-ledger.service';
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
  startOfDayPlus,
} from '../common/date.util';
import {
  UserMistake,
  UserMistakeDocument,
} from '../users/schemas/user-mistake.schema';
import { isSuperActive } from '../users/super.util';
import { checkinRewardFor } from './checkin-reward';
import {
  bumpQuestCounter,
  LEGACY_QUEST_LANGUAGE,
  QUEST_EVENT_KEYS,
  languageQuestValue,
  type QuestCounterKey,
} from '../users/utils/quest-counter.util';
import {
  LEARNING_COURSES,
  resolveCourseScope,
  type CourseScope,
} from '../common/learning-course';
import { courseOf } from '../users/learn-mode.constants';
import {
  CHECKIN_REWARDS,
  COMEBACK,
  COURSE_QUEST_KINDS,
  DAILY_QUESTS,
  MONTHLY_CHALLENGE,
  QUEST_CHEST_FREEZE_FALLBACK_GEMS,
  STREAK_FREEZE,
  STREAK_GOALS,
} from './retention.config';
import {
  bandOf,
  pickBonus,
  pickDailyQuests,
  questFor,
  rerollPick,
  rollQuestChest,
  type CourseQuest,
  type CourseQuestContext,
  type PickContext,
  type QuestPick,
} from './quest-picker';

const DAY_MS = 86_400_000;
const STUDIED = {
  $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
};

/** 옛 앱(퀘스트 3종 고정)이 아는 id */
export const LEGACY_QUEST_IDS = ['xp', 'correct', 'minutes'] as const;
export const QUEST_SLOT_IDS = ['easy', 'normal', 'hard', 'bonus'] as const;

/** 상자 대표값 — 옛 앱이 상자 옆 숫자 칸에 그린다 (실제로는 랜덤) */
const QUEST_CHEST_DISPLAY_GEMS = 50;

/** 오늘 칸의 진행도에 쓰는 통계 필드 */
const QUEST_STAT_FIELDS =
  'xpEarned correctQuestions studyTimeSeconds questCounters categoryCounts languageQuests';

/**
 * 오늘 칸의 진행도 — 학습 통계 + 행동 카운터.
 * 문제 퀘스트(COURSE_QUEST_KINDS)는 그 언어 것만 센다 (quest-counter.util languageQuestValue).
 * XP·시간·팔로우·공유는 계정 공통이다.
 */
function progressOf(
  quest: CourseQuest,
  row: {
    xpEarned?: number;
    correctQuestions?: number;
    studyTimeSeconds?: number;
    questCounters?: unknown;
    categoryCounts?: unknown;
    languageQuests?: unknown;
  } | null,
  language: string,
): number {
  switch (quest.kind) {
    case 'xp':
      return row?.xpEarned ?? 0;
    case 'minutes':
      return Math.floor((row?.studyTimeSeconds ?? 0) / 60);
    case 'correct':
    case 'sessions':
    case 'accurate':
    case 'perfect':
    case 'mistakes':
      return languageQuestValue(row, language, quest.kind);
    case 'category':
      return languageQuestValue(
        row,
        language,
        `categoryCounts.${quest.category ?? ''}`,
      );
    default:
      // follow · shareProgress · shareInvite
      return Number(
        (row?.questCounters as Record<string, number> | undefined)?.[
          quest.kind
        ] ?? 0,
      );
  }
}

/**
 * 카테고리 퀘스트 — 최근 7일에 그 언어로 실제로 푼 분야 중 정답률이 가장 낮은 곳.
 * 안 해 본 분야(잠긴 기능일 수도)는 내지 않는다.
 */
function weakestCategory(
  rows: {
    categoryCounts?: unknown;
    categoryCorrect?: unknown;
    languageQuests?: unknown;
  }[],
  language: string,
): string | null {
  const counts = new Map<string, number>();
  const correct = new Map<string, number>();
  for (const row of rows) {
    for (const cat of DAILY_QUESTS.CATEGORIES) {
      const n = languageQuestValue(row, language, `categoryCounts.${cat}`);
      if (n) counts.set(cat, (counts.get(cat) ?? 0) + n);
      // 정답 기록이 없는 옛 데이터는 정답률을 모른다 — 0% 로 보지 않는다
      if (hasCategoryCorrect(row, language, cat)) {
        correct.set(
          cat,
          (correct.get(cat) ?? 0) +
            languageQuestValue(row, language, `categoryCorrect.${cat}`),
        );
      }
    }
  }
  const scored = [...counts.entries()]
    .filter(([, n]) => n >= DAILY_QUESTS.CATEGORY_MIN_RECENT)
    .map(([cat, n]) => ({
      cat,
      // 정답률을 모르는 분야는 뒤로 미룬다
      acc: correct.has(cat) ? (correct.get(cat) ?? 0) / n : 2,
    }))
    .sort((a, b) => a.acc - b.acc);
  return scored[0]?.cat ?? null;
}

function hasCategoryCorrect(
  row: { categoryCorrect?: unknown; languageQuests?: unknown },
  language: string,
  cat: string,
): boolean {
  const source =
    language === LEGACY_QUEST_LANGUAGE
      ? row.categoryCorrect
      : (
          (row.languageQuests as Record<string, Record<string, unknown>>)?.[
            language
          ] as Record<string, unknown> | undefined
        )?.categoryCorrect;
  if (!source || typeof source !== 'object') return false;
  const value =
    source instanceof Map
      ? (source.get(cat) as unknown)
      : (source as Record<string, unknown>)[cat];
  return value != null;
}

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
    @InjectModel(UserMistake.name)
    private readonly mistakeModel: Model<UserMistakeDocument>,
    private readonly usersService: UsersService,
    private readonly gemPass: GemPassService,
    @Optional() private readonly gemLedger?: GemLedgerService,
  ) {}

  // ─────────────────────────── 요약 ───────────────────────────

  /** 홈 한 번에 — 복구펜 · 퀘스트 · 출석 · 복귀 · XP 부스트 · 연속 목표 */
  async summary(userId: string, course?: Partial<CourseScope>) {
    // 연속을 먼저 맞춘다 — 복구펜 자동 사용·목표 판정이 여기서 일어난다
    await this.usersService.syncStreak(userId).catch(() => null);

    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    const now = new Date();
    const today = dayKey(now, tz);

    const [quests, comeback] = await Promise.all([
      this.questsFor(me, tz, today, this.questScope(me, course)),
      this.comebackFor(me, tz, now),
    ]);

    return {
      gems: me.gems ?? 0,
      streak: me.streak ?? 0,
      freeze: this.freezeView(me),
      quests,
      monthly: this.monthlyView(me, today),
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
    await this.gemLedger?.record(
      uid,
      -STREAK_FREEZE.PRICE_GEMS,
      'streak_freeze',
    );
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
   * 오늘의 퀘스트.
   *
   * 칸(쉬움·보통·어려움 + SUPER bonus)은 그날 처음 볼 때 뽑아서 저장한다
   * (quest-picker — 유저·날짜 시드라 다시 뽑아도 같다). 진행도는 그날의 학습
   * 통계(UserStats)와 행동 카운터(questCounters)에서 읽는다.
   *
   * items 는 **옛 앱용**이다 — 옛 앱은 xp·correct·minutes 세 종류만 알아서,
   * 오늘 깔린 칸 중 그 종류인 것만 옛 모양으로 보내 준다 (모르는 id 를 받으면
   * 홈이 죽는다). 새 앱은 slots 를 그린다.
   */
  private async questsFor(
    me: User & { _id: Types.ObjectId },
    tz: string,
    today: string,
    scope: CourseScope,
  ) {
    const isSuper = isSuperActive(me);
    const state = await this.ensureQuestState(me, tz, today, isSuper, scope);

    const row = await this.statsModel
      .findOne({ userId: me._id, date: startOfDay(new Date(), tz) })
      .select(QUEST_STAT_FIELDS)
      .lean();

    const slots = state.picks
      // SUPER 가 끝났으면 bonus 칸은 숨긴다 (받을 수도 없다)
      .filter((pick) => pick.slot !== 'bonus' || isSuper)
      .map((pick) => {
        // 문제 퀘스트는 지금 코스의 모양으로 — 한국어 화면엔 한국어 문제, 영어 화면엔 영어 문제
        const quest = questFor(pick, scope.courseId);
        const claimed = state.claimed.includes(pick.slot);
        const progress = progressOf(quest, row, scope.targetLanguage);
        // 칸은 코스끼리 하나다 — 다른 언어로 이미 받은 칸은 여기서도 끝난 칸이다
        const done = claimed || progress >= quest.target;
        return {
          id: pick.slot,
          slot: pick.slot,
          kind: quest.kind,
          category: quest.category ?? null,
          /** 문제 퀘스트면 어느 언어 문제를 세는지 ('ko' · 'en'). 공통 퀘스트는 null */
          course: COURSE_QUEST_KINDS.has(quest.kind)
            ? scope.targetLanguage
            : null,
          promo: !!pick.promo,
          target: quest.target,
          progress: claimed
            ? quest.target
            : Math.min(quest.target, Math.max(0, progress)),
          done,
          claimed,
          gems: DAILY_QUESTS.REWARD[pick.slot] ?? 0,
        };
      });
    const base = slots.filter((slot) => slot.slot !== 'bonus');
    const rerollMax = isSuper
      ? DAILY_QUESTS.REROLLS_SUPER
      : DAILY_QUESTS.REROLLS_FREE;

    return {
      day: today,
      // 옛 앱용 (위 설명)
      items: slots
        .filter((slot) =>
          (LEGACY_QUEST_IDS as readonly string[]).includes(slot.kind),
        )
        .map((slot) => ({
          id: slot.kind,
          target: slot.target,
          progress: slot.progress,
          done: slot.done,
          claimed: slot.claimed,
          gems: slot.gems,
        })),
      slots,
      rerolls: {
        used: state.rerolls,
        max: rerollMax,
        left: Math.max(0, rerollMax - state.rerolls),
      },
      chest: {
        // 뭐가 나올지 모르는 상자 — 옛 앱이 숫자 칸에 그릴 대표값
        gems: QUEST_CHEST_DISPLAY_GEMS,
        ready: base.length > 0 && base.every((slot) => slot.done),
        claimed: state.claimed.includes('chest'),
      },
    };
  }

  /** 오늘 깔린 칸을 돌려준다. 없으면(그날 처음) 뽑아서 저장한다 */
  private async ensureQuestState(
    me: User & { _id: Types.ObjectId },
    tz: string,
    today: string,
    isSuper: boolean,
    scope: CourseScope,
  ): Promise<{ picks: QuestPick[]; claimed: string[]; rerolls: number }> {
    const prev = me.dailyQuestState;
    const sameDay = prev?.day === today;

    if (sameDay && prev?.picks?.length) {
      let picks = prev.picks as QuestPick[];
      // 오늘 SUPER 가 됐다 — 이미 깔린 세 칸은 두고 bonus 만 붙인다
      if (isSuper && !picks.some((pick) => pick.slot === 'bonus')) {
        const bonus = pickBonus(
          await this.pickContext(me, tz, today, isSuper, scope),
          picks,
        );
        if (bonus) {
          await this.userModel.updateOne(
            {
              _id: me._id,
              'dailyQuestState.day': today,
              'dailyQuestState.picks.slot': { $ne: 'bonus' },
            },
            { $push: { 'dailyQuestState.picks': bonus } },
          );
          picks = [...picks, bonus];
        }
      }
      return {
        picks,
        claimed: prev.claimed ?? [],
        rerolls: prev.rerolls ?? 0,
      };
    }

    const picks = pickDailyQuests(
      await this.pickContext(me, tz, today, isSuper, scope),
    );
    // 배포 당일 옛 기록(picks 없음)이면 받은 것(상자 등)은 그대로 둔다
    const claimed = sameDay ? (prev?.claimed ?? []) : [];
    const res = await this.userModel.updateOne(
      {
        _id: me._id,
        $or: [
          { dailyQuestState: null },
          { 'dailyQuestState.day': { $ne: today } },
          { 'dailyQuestState.picks.0': { $exists: false } },
        ],
      },
      { $set: { dailyQuestState: { day: today, claimed, picks, rerolls: 0 } } },
    );
    if (!res.modifiedCount) {
      // 다른 요청(다른 기기)이 먼저 깔았다 — 그걸 쓴다
      const fresh = await this.userModel
        .findById(me._id)
        .select('dailyQuestState')
        .lean();
      const st = fresh?.dailyQuestState;
      if (st?.day === today && st.picks?.length) {
        return {
          picks: st.picks as QuestPick[],
          claimed: st.claimed ?? [],
          rerolls: st.rerolls ?? 0,
        };
      }
    }
    return { picks, claimed, rerolls: 0 };
  }

  /**
   * 뽑기에 필요한 것 — 최근 7일 활동량(목표치 크기), 오답 수, 약한 분야.
   * 오늘은 빼고 본다 (오늘 많이 했다고 오늘 목표가 커지면 안 된다).
   */
  private async pickContext(
    me: User & { _id: Types.ObjectId },
    tz: string,
    today: string,
    isSuper: boolean,
    scope: CourseScope,
  ): Promise<PickContext> {
    const now = new Date();
    const [rows, mistakesByLanguage] = await Promise.all([
      this.statsModel
        .find({
          userId: me._id,
          date: {
            $gte: startOfDayPlus(now, -7, tz),
            $lt: startOfDay(now, tz),
          },
        })
        .select(
          'xpEarned totalQuestions categoryCounts categoryCorrect languageQuests',
        )
        .lean(),
      this.openMistakesByLanguage(me._id),
    ]);

    const studied = rows.filter(
      (r) => (r.xpEarned ?? 0) > 0 || (r.totalQuestions ?? 0) > 0,
    );
    const avgXp = studied.length
      ? studied.reduce((sum, r) => sum + (r.xpEarned ?? 0), 0) / studied.length
      : 0;

    // 문제 퀘스트는 코스(언어)마다 따로 낸다 — 오답 수·약한 분야도 그 언어 것으로
    const courses: Record<string, CourseQuestContext> = {};
    for (const course of LEARNING_COURSES) {
      courses[course.courseId] = {
        openMistakes: mistakesByLanguage.get(course.targetLanguage) ?? 0,
        category: weakestCategory(rows, course.targetLanguage),
      };
    }

    return {
      userId: me._id.toString(),
      day: today,
      band: bandOf(avgXp),
      isSuper,
      course: scope.courseId,
      courses,
    };
  }

  /** 아직 해소 안 된 오답 수 — 문제의 언어별 (언어 없는 옛 문제는 한국어) */
  private async openMistakesByLanguage(
    userId: Types.ObjectId,
  ): Promise<Map<string, number>> {
    const rows = await this.mistakeModel.aggregate<{
      _id: string;
      n: number;
    }>([
      { $match: { userId, resolvedAt: null } },
      {
        $lookup: {
          from: 'questions',
          localField: 'questionId',
          foreignField: '_id',
          as: 'question',
        },
      },
      {
        $group: {
          _id: {
            $ifNull: [
              { $arrayElemAt: ['$question.targetLanguage', 0] },
              LEGACY_QUEST_LANGUAGE,
            ],
          },
          n: { $sum: 1 },
        },
      },
    ]);
    return new Map(rows.map((row) => [String(row._id), row.n]));
  }

  /** 퀘스트를 어느 코스로 볼지 — 앱이 보낸 코스, 없으면(옛 앱) 계정의 지금 코스 */
  private questScope(me: User, course?: Partial<CourseScope>): CourseScope {
    if (course?.courseId || course?.targetLanguage) {
      return resolveCourseScope(course);
    }
    return resolveCourseScope({ targetLanguage: courseOf(me.targetLanguage) });
  }

  /**
   * 퀘스트 보상 받기. id = easy | normal | hard | bonus | chest.
   * 옛 앱은 xp | correct | minutes 로 보낸다 — 오늘 그 종류인 칸으로 바꿔 읽는다.
   * 받을 때마다 월간 챌린지 칸이 하나 찬다 (상자는 안 센다).
   */
  async claimQuest(userId: string, id: string, course?: Partial<CourseScope>) {
    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    const today = dayKey(new Date(), tz);
    const quests = await this.questsFor(
      me,
      tz,
      today,
      this.questScope(me, course),
    );

    if (id === 'chest') {
      if (!quests.chest.ready) throw new BadRequestException('QUEST_NOT_DONE');
      return this.openQuestChest(me, today);
    }

    const slotId = (LEGACY_QUEST_IDS as readonly string[]).includes(id)
      ? quests.slots.find((slot) => slot.kind === id)?.slot
      : id;
    const slot = quests.slots.find((s) => s.slot === slotId);
    if (!slot) throw new BadRequestException('UNKNOWN_QUEST');
    if (!slot.done) throw new BadRequestException('QUEST_NOT_DONE');

    const reward = slot.gems;
    const month = today.slice(0, 7);
    const sameMonth = { $eq: ['$monthlyQuest.month', month] };

    // 오늘 이미 받았으면 조건에서 걸린다 (연타·두 기기)
    const updated = await this.userModel
      .findOneAndUpdate(
        {
          _id: me._id,
          'dailyQuestState.day': today,
          'dailyQuestState.claimed': { $ne: slot.slot },
        },
        [
          {
            $set: {
              'dailyQuestState.claimed': {
                $concatArrays: [
                  { $ifNull: ['$dailyQuestState.claimed', []] },
                  [slot.slot],
                ],
              },
              gems: { $add: [{ $ifNull: ['$gems', 0] }, reward] },
              monthlyQuest: {
                $cond: [
                  sameMonth,
                  {
                    month,
                    count: {
                      $add: [{ $ifNull: ['$monthlyQuest.count', 0] }, 1],
                    },
                    claimed: { $ifNull: ['$monthlyQuest.claimed', []] },
                  },
                  { month, count: 1, claimed: [] },
                ],
              },
            },
          },
        ],
        { returnDocument: 'after', updatePipeline: true },
      )
      .select('gems monthlyQuest questBadges')
      .lean();

    if (!updated) throw new BadRequestException('QUEST_ALREADY_CLAIMED');
    await this.gemLedger?.record(me._id, reward, 'quest');
    return {
      gems: updated.gems ?? 0,
      reward,
      monthly: this.monthlyView(updated as User, today),
    };
  }

  /** 상자 — 보석·XP 부스트·복구펜 중 하나. 하루 한 번 (조건부 원자 업데이트) */
  private async openQuestChest(
    me: User & { _id: Types.ObjectId },
    today: string,
  ) {
    let roll = rollQuestChest();
    // 복구펜이 이미 꽉 찼으면 보석으로 바꿔 준다
    if (
      roll.type === 'freeze' &&
      (me.streakFreeze ?? 0) >= STREAK_FREEZE.MAX_HOLD
    ) {
      roll = { type: 'gems', gems: QUEST_CHEST_FREEZE_FALLBACK_GEMS };
    }

    const set: Record<string, unknown> = {
      'dailyQuestState.claimed': {
        $concatArrays: [
          { $ifNull: ['$dailyQuestState.claimed', []] },
          ['chest'],
        ],
      },
    };
    if (roll.type === 'gems') {
      set.gems = { $add: [{ $ifNull: ['$gems', 0] }, roll.gems] };
    } else if (roll.type === 'xpBoost') {
      // 이미 켜져 있으면 끝나는 시각에 이어 붙인다
      set.xpBoostUntil = {
        $add: [
          { $max: ['$$NOW', { $ifNull: ['$xpBoostUntil', '$$NOW'] }] },
          roll.minutes * 60_000,
        ],
      };
    } else {
      set.streakFreeze = {
        $min: [
          STREAK_FREEZE.MAX_HOLD,
          { $add: [{ $ifNull: ['$streakFreeze', 0] }, 1] },
        ],
      };
    }

    const updated = await this.userModel
      .findOneAndUpdate(
        {
          _id: me._id,
          'dailyQuestState.day': today,
          'dailyQuestState.claimed': { $ne: 'chest' },
        },
        [{ $set: set }],
        { returnDocument: 'after', updatePipeline: true },
      )
      .select('gems xpBoostUntil streakFreeze')
      .lean();
    if (!updated) throw new BadRequestException('QUEST_ALREADY_CLAIMED');
    if (roll.type === 'gems') {
      await this.gemLedger?.record(me._id, roll.gems, 'quest_chest');
    }

    return {
      gems: updated.gems ?? 0,
      // 옛 앱은 이 숫자를 "+N 보석" 으로 띄운다
      reward: roll.type === 'gems' ? roll.gems : 0,
      chest:
        roll.type === 'gems'
          ? { type: 'gems' as const, gems: roll.gems }
          : roll.type === 'xpBoost'
            ? {
                type: 'xpBoost' as const,
                minutes: roll.minutes,
                multiplier: COMEBACK.XP_MULTIPLIER,
              }
            : { type: 'freeze' as const, owned: updated.streakFreeze ?? 0 },
      xpBoost:
        updated.xpBoostUntil && new Date(updated.xpBoostUntil) > new Date()
          ? {
              until: new Date(updated.xpBoostUntil).toISOString(),
              multiplier: COMEBACK.XP_MULTIPLIER,
            }
          : null,
    };
  }

  /**
   * 한 칸 바꾸기 — 하루 REROLLS_FREE 번 (SUPER 는 REROLLS_SUPER).
   * 받았거나 이미 끝낸 칸은 못 바꾼다. 같은 난이도의 다른 퀘스트로.
   */
  async rerollQuest(
    userId: string,
    slotId: string,
    course?: Partial<CourseScope>,
  ) {
    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    const today = dayKey(new Date(), tz);
    const scope = this.questScope(me, course);
    const quests = await this.questsFor(me, tz, today, scope);

    const slot = quests.slots.find((s) => s.slot === slotId);
    if (!slot) throw new BadRequestException('UNKNOWN_QUEST');
    if (slot.claimed) throw new BadRequestException('QUEST_ALREADY_CLAIMED');
    if (slot.done) throw new BadRequestException('QUEST_DONE');
    if (quests.rerolls.left <= 0) throw new BadRequestException('NO_REROLLS');

    // questsFor 가 오늘 칸을 저장해 뒀다 — 저장된 그대로 다시 읽어 바꾼다
    const fresh = await this.findMe(userId);
    const state = fresh.dailyQuestState;
    if (state?.day !== today || !state.picks?.length) {
      throw new BadRequestException('REROLL_CONFLICT');
    }
    const used = state.rerolls ?? 0;
    const next = rerollPick(
      await this.pickContext(fresh, tz, today, isSuperActive(fresh), scope),
      state.picks as QuestPick[],
      slot.slot,
      used + 1,
    );
    if (!next) throw new BadRequestException('NO_ALTERNATIVE');

    const res = await this.userModel.updateOne(
      {
        _id: me._id,
        'dailyQuestState.day': today,
        'dailyQuestState.claimed': { $ne: slot.slot },
        ...(used === 0
          ? {
              $or: [
                { 'dailyQuestState.rerolls': 0 },
                { 'dailyQuestState.rerolls': { $exists: false } },
              ],
            }
          : { 'dailyQuestState.rerolls': used }),
      },
      {
        $set: {
          'dailyQuestState.picks.$[p]': next,
          'dailyQuestState.rerolls': used + 1,
        },
      },
      { arrayFilters: [{ 'p.slot': slot.slot }] },
    );
    if (!res.modifiedCount) throw new BadRequestException('REROLL_CONFLICT');

    const after = await this.findMe(userId);
    return { quests: await this.questsFor(after, tz, today, scope) };
  }

  /**
   * 앱이 알려 주는 행동 (공유) — 서버가 직접 볼 수 없어서 앱 말을 믿는다.
   * 그래서 하루 상한(EVENT_DAILY_CAP)을 걸고, 보상은 어차피 칸당 하루 한 번이다.
   */
  async questEvent(
    userId: string,
    type: string,
    course?: Partial<CourseScope>,
  ) {
    if (!QUEST_EVENT_KEYS.includes(type as QuestCounterKey)) {
      throw new BadRequestException('UNKNOWN_EVENT');
    }
    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    await bumpQuestCounter(
      this.statsModel,
      me._id,
      startOfDay(new Date(), tz),
      type as QuestCounterKey,
      1,
      DAILY_QUESTS.EVENT_DAILY_CAP,
    );
    return {
      quests: await this.questsFor(
        me,
        tz,
        dayKey(new Date(), tz),
        this.questScope(me, course),
      ),
    };
  }

  // ─────────────────────────── 월간 챌린지 ───────────────────────────

  private monthlyView(
    me: Pick<User, 'monthlyQuest' | 'questBadges'>,
    today: string,
  ) {
    const month = today.slice(0, 7);
    const st = me.monthlyQuest?.month === month ? me.monthlyQuest : null;
    const count = st?.count ?? 0;
    const claimed = st?.claimed ?? [];
    const [y, m, d] = today.split('-').map(Number);
    const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return {
      month,
      count,
      target: MONTHLY_CHALLENGE.TARGET,
      /** 오늘 포함 남은 날 */
      daysLeft: Math.max(1, daysInMonth - d + 1),
      milestones: MONTHLY_CHALLENGE.MILESTONES.map((ms) => ({
        at: ms.at,
        gems: ms.gems,
        badge: ms.badge,
        reached: count >= ms.at,
        claimed: claimed.includes(ms.at),
      })),
      /** 지금까지 모은 배지 (달 키, 최근 순) */
      badges: [...(me.questBadges ?? [])].sort().reverse(),
    };
  }

  /** 월간 챌린지 칸 보상. 배지 칸이면 그 달 배지도 */
  async claimMonthly(userId: string, at: number) {
    const ms = MONTHLY_CHALLENGE.MILESTONES.find((m) => m.at === Number(at));
    if (!ms) throw new BadRequestException('UNKNOWN_MILESTONE');
    const me = await this.findMe(userId);
    const tz = resolveTimezone(me.timezone);
    const today = dayKey(new Date(), tz);
    const month = today.slice(0, 7);

    const updated = await this.userModel
      .findOneAndUpdate(
        {
          _id: me._id,
          'monthlyQuest.month': month,
          'monthlyQuest.count': { $gte: ms.at },
          'monthlyQuest.claimed': { $ne: ms.at },
        },
        {
          $push: { 'monthlyQuest.claimed': ms.at },
          $inc: { gems: ms.gems },
          ...(ms.badge ? { $addToSet: { questBadges: month } } : {}),
        },
        { returnDocument: 'after' },
      )
      .select('gems monthlyQuest questBadges')
      .lean();
    if (!updated) throw new BadRequestException('MONTHLY_NOT_READY');
    await this.gemLedger?.record(me._id, ms.gems, 'monthly_challenge', {
      at: ms.at,
    });

    return {
      gems: updated.gems ?? 0,
      reward: ms.gems,
      badge: ms.badge ? month : null,
      monthly: this.monthlyView(updated as User, today),
    };
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
      // SUPER(체험 포함)면 "SUPER 하루" 칸이 보석으로 보인다 (checkin-reward)
      rewards: CHECKIN_REWARDS.map((r, i) => ({
        day: i + 1,
        ...checkinRewardFor(me, r),
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
    // 이미 프리미엄이면 SUPER 하루 대신 그만큼의 보석 (checkin-reward 참고)
    const reward = checkinRewardFor(me, CHECKIN_REWARDS[count]);

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

    // 프리미엄까지 무사히 준 뒤에 적는다 (실패하면 위에서 보석을 되돌린다)
    await this.gemLedger?.record(me._id, reward.gems ?? 0, 'checkin', {
      day: count + 1,
      ...(reward.swapped ? { superDay: 1 } : {}),
    });

    const after = await this.userModel
      .findById(me._id)
      .select('gems isSuper superExpiresAt superTier')
      .lean();
    return {
      day: count + 1,
      gems: after?.gems ?? 0,
      reward: {
        gems: reward.gems,
        superDays: reward.superDays,
        swapped: reward.swapped,
      },
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
    await this.gemLedger?.record(me._id, option.gems, 'streak_goal', {
      days: option.days,
    });

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
        'timezone targetLanguage gems streak streakFreeze streakFreezeNotice dailyQuestState dailyGoalMinutes comebackClaimedAt xpBoostUntil checkin streakGoal isSuper superExpiresAt monthlyQuest questBadges',
      )
      .lean();
    if (!me) throw new NotFoundException('USER_NOT_FOUND');
    return me as User & { _id: Types.ObjectId };
  }
}
