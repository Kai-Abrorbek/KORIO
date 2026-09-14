import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../../users/schemas/user-stats.schema';
import {
  UserProgress,
  UserProgressDocument,
} from '../../users/schemas/user-progress.schema';
import {
  Subscription,
  SubscriptionDocument,
} from '../../payments/subscriptions/subscription.schema';
import {
  SubscriptionEvent,
  SubscriptionEventDocument,
} from '../../analytics/schemas/subscription-event.schema';
import {
  LessonAttempt,
  LessonAttemptDocument,
} from '../../analytics/schemas/lesson-attempt.schema';
import { ENTITLED_STATUSES } from '../../payments/subscriptions/subscription.types';
import {
  DateRange,
  dayKey,
  deltaPct,
  fillSeries,
  resolveRange,
} from './range.util';

/** 사람이 아닌 계정은 모든 숫자에서 뺀다 — 리그 봇이 users 에 진짜 문서로 있다 */
const REAL_USERS = { isBot: { $ne: true } };

const DAY_MS = 86_400_000;

/**
 * 계산할 수 없는 지표.
 *
 * ⚠️ **추정해서 보여주지 않는다.** 어드민이 숫자를 믿고 결정을 내리는 화면이라,
 *    그럴듯한 가짜 하나가 없는 것보다 훨씬 나쁘다. 왜 없는지와 무엇을 해야
 *    생기는지를 같이 내려보내서 화면이 그대로 말하게 한다.
 */
export const UNAVAILABLE_METRICS = [
  {
    key: 'mrr',
    reason: 'NO_PRICE_DATA',
    detail:
      '결제 금액이 어디에도 저장되지 않는다. 가격은 Play Console 에 있고 ' +
      'provider 가 응답에서 꺼내오지 않는다. Subscription.priceMicros 를 ' +
      '채우기 시작하면 그때부터 계산된다.',
  },
] as const;

@Injectable()
export class AdminAnalyticsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserStats.name)
    private readonly statsModel: Model<UserStatsDocument>,
    @InjectModel(UserProgress.name)
    private readonly progressModel: Model<UserProgressDocument>,
    @InjectModel(Subscription.name)
    private readonly subModel: Model<SubscriptionDocument>,
    @InjectModel(SubscriptionEvent.name)
    private readonly subEventModel: Model<SubscriptionEventDocument>,
    @InjectModel(LessonAttempt.name)
    private readonly attemptModel: Model<LessonAttemptDocument>,
  ) {}

  // ─────────────────────────── 개요 ───────────────────────────

  /**
   * 대시보드 첫 화면의 KPI.
   *
   * 모든 값에 **직전 같은 길이 기간**과의 비교가 붙는다. 숫자 하나만으로는
   * 좋은 건지 나쁜 건지 알 수 없다.
   */
  async overview(fromISO?: string, toISO?: string) {
    const range = resolveRange(fromISO, toISO);
    const now = new Date();

    const [
      activeNow,
      activePrev,
      signupsSeries,
      signupsPrev,
      studyNow,
      studyPrev,
      premium,
      totalUsers,
      studiedToday,
      dauSeries,
    ] = await Promise.all([
      this.distinctLearners(range.from, range.to),
      this.distinctLearners(range.prevFrom, range.prevTo),
      this.signupSeries(range),
      this.countSignups(range.prevFrom, range.prevTo),
      this.studyTotals(range.from, range.to),
      this.studyTotals(range.prevFrom, range.prevTo),
      this.countActiveSubscriptions(),
      this.userModel.countDocuments(REAL_USERS),
      this.distinctLearners(new Date(now.getTime() - DAY_MS), now),
      this.dauSeries(range),
    ]);

    const signupsNow = signupsSeries.reduce((s, p) => s + p.value, 0);
    const free = Math.max(0, totalUsers - premium);

    const kpis = [
      kpi('activeLearners', activeNow, activePrev, dauSeries.map((p) => p.value), {
        // "앱을 열었다" 가 아니라 "실제로 공부했다" 다. 둘은 다른 숫자이고,
        // 학습 앱에서 의미 있는 쪽은 이쪽이다
        note: 'STUDIED_NOT_OPENED',
      }),
      kpi('newUsers', signupsNow, signupsPrev, signupsSeries.map((p) => p.value)),
      kpi('studiedToday', studiedToday, null, dauSeries.slice(-14).map((p) => p.value)),
      kpi('lessonsCompleted', studyNow.lessons, studyPrev.lessons, []),
      kpi(
        'avgStudyMinutes',
        studyNow.avgMinutes,
        studyPrev.avgMinutes,
        [],
        // 앱이 신고하는 값이다. 서버가 잰 시간이 아니다
        { note: 'CLIENT_REPORTED' },
      ),
      kpi('premiumUsers', premium, null, []),
      kpi('freeUsers', free, null, []),
      kpi(
        'premiumRate',
        totalUsers ? Math.round((premium / totalUsers) * 1000) / 10 : 0,
        null,
        [],
        { unit: 'percent' },
      ),

    ];

    return {
      range: {
        from: range.from.toISOString(),
        to: range.to.toISOString(),
        prevFrom: range.prevFrom.toISOString(),
        prevTo: range.prevTo.toISOString(),
        days: range.days,
      },
      kpis,
      unavailable: UNAVAILABLE_METRICS,
    };
  }

  // ─────────────────────────── 활동 ───────────────────────────

  /**
   * DAU / WAU / MAU 추이.
   *
   * 정의: **그날 실제로 학습한 사람** (UserStats 에 행이 생긴 사람).
   * "앱을 열었다"(User.lastActiveAt)와는 다른 숫자다. 학습 앱에서 의미 있는
   * 쪽은 이쪽이라 이걸 기본으로 잡았고, 화면에도 그렇게 적힌다.
   *
   * ⚠️ UserStats.date 는 **유저 각자의 시간대**로 자른 날짜다. 우즈벡과 한국이
   *    섞여 있어서 하루 경계가 사람마다 조금씩 다르다. 추이를 보는 데는 문제가
   *    없지만 "정확히 이 24시간" 을 묻는 값은 아니다.
   */
  async activeUsers(fromISO?: string, toISO?: string) {
    const range = resolveRange(fromISO, toISO);
    const daily = await this.dauSeries(range);

    // WAU/MAU 는 롤링 창이다. 각 날짜마다 그 이전 7일/30일의 고유 유저 수를
    // 세야 하는데, 날짜마다 쿼리를 던지면 30번이 된다. 한 번에 가져와서
    // 메모리에서 굴린다 (구간이 90일이어도 행 수는 학습자 수 × 일수 수준)
    const rows = await this.statsModel
      .aggregate<{ _id: { d: string; u: string } }>([
        {
          $match: {
            date: { $gte: new Date(range.from.getTime() - 29 * DAY_MS), $lte: range.to },
            $or: [{ totalQuestions: { $gt: 0 } }, { xpEarned: { $gt: 0 } }],
          },
        },
        { $group: { _id: { d: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, u: '$userId' } } },
      ])
      .exec();

    const byDay = new Map<string, Set<string>>();
    for (const r of rows) {
      const set = byDay.get(r._id.d) ?? new Set<string>();
      set.add(String(r._id.u));
      byDay.set(r._id.d, set);
    }

    const rolling = (end: Date, windowDays: number) => {
      const seen = new Set<string>();
      for (let i = 0; i < windowDays; i++) {
        const k = dayKey(new Date(end.getTime() - i * DAY_MS));
        for (const u of byDay.get(k) ?? []) seen.add(u);
      }
      return seen.size;
    };

    return {
      definition: 'STUDIED',
      series: daily.map((p) => {
        const d = new Date(`${p.date}T00:00:00.000Z`);
        return {
          date: p.date,
          dau: p.value,
          wau: rolling(d, 7),
          mau: rolling(d, 30),
        };
      }),
    };
  }

  // ─────────────────────────── 학습 퍼널 ───────────────────────────

  /**
   * 가입부터 프리미엄까지의 학습 퍼널.
   *
   * ⚠️ **"첫 레슨 시작" 단계는 계측을 배포한 날부터만 유효하다.** 그 전에는
   *    레슨 시작이 어디에도 기록되지 않았다 (UserProgress 는 완료 시에만 생긴다).
   *    그래서 이 단계에는 `since` 가 붙어 나가고, 화면이 "언제부터의 숫자인지"를
   *    같이 보여준다. 옛 유저까지 섞어 비율을 내면 그 비율은 거짓말이 된다.
   */
  async learningFunnel() {
    const [
      signed,
      onboarded,
      placed,
      firstStart,
      firstComplete,
      returned7d,
      premium,
      firstAttemptEver,
    ] = await Promise.all([
      this.userModel.countDocuments(REAL_USERS),
      this.userModel.countDocuments({ ...REAL_USERS, isOnboardingCompleted: true }),
      this.userModel.countDocuments({
        ...REAL_USERS,
        $or: [{ placementLevelSetAt: { $ne: null } }, { hangulCompletedAt: { $ne: null } }],
      }),
      this.attemptModel.distinct('userId').then((v) => v.length),
      this.progressModel.distinct('userId', { isCompleted: true }).then((v) => v.length),
      // 가입 다음 날 이후에도 학습 기록이 있는 사람
      this.statsModel
        .aggregate<{ _id: null; n: number }>([
          { $group: { _id: '$userId', first: { $min: '$date' }, last: { $max: '$date' } } },
          { $match: { $expr: { $gte: [{ $subtract: ['$last', '$first'] }, 7 * DAY_MS] } } },
          { $count: 'n' },
        ])
        .then((r) => r[0]?.n ?? 0),
      this.countActiveSubscriptions(),
      this.attemptModel.findOne().sort({ startedAt: 1 }).select('startedAt').lean(),
    ]);

    const steps = [
      { key: 'signup', users: signed },
      { key: 'onboarding', users: onboarded },
      { key: 'placement', users: placed },
      {
        key: 'firstLessonStart',
        users: firstStart,
        // 계측 시작 이후만 셀 수 있다는 걸 화면이 알아야 한다
        since: firstAttemptEver?.startedAt?.toISOString() ?? null,
        partial: true,
      },
      { key: 'firstLessonComplete', users: firstComplete },
      { key: 'return7d', users: returned7d },
      { key: 'premium', users: premium },
    ];

    return {
      steps: steps.map((s, i) => ({
        ...s,
        /** 직전 단계 대비 전환율 */
        conversionFromPrev:
          i === 0 || !steps[i - 1]!.users
            ? null
            : Math.round((s.users / steps[i - 1]!.users) * 1000) / 10,
        /** 맨 처음 대비 */
        conversionFromStart: signed ? Math.round((s.users / signed) * 1000) / 10 : null,
      })),
    };
  }

  // ─────────────────────────── 구독 ───────────────────────────

  async subscriptions(fromISO?: string, toISO?: string) {
    const range = resolveRange(fromISO, toISO);
    const [active, totalUsers, events, trials] = await Promise.all([
      this.countActiveSubscriptions(),
      this.userModel.countDocuments(REAL_USERS),
      this.subEventModel
        .aggregate<{ _id: { d: string; r: string; s: string }; n: number }>([
          { $match: { at: { $gte: range.from, $lte: range.to } } },
          {
            $group: {
              _id: {
                d: { $dateToString: { format: '%Y-%m-%d', date: '$at' } },
                r: '$reason',
                s: '$toStatus',
              },
              n: { $sum: 1 },
            },
          },
        ])
        .exec(),
      this.userModel.countDocuments({ ...REAL_USERS, trialStartedAt: { $ne: null } }),
    ]);

    // 갱신(supersede)은 이탈이 아니다. 섞으면 취소 추이가 갱신 때마다 튄다
    const newSubs = events.filter((e) => e._id.r === 'purchase' && e._id.s === 'active');
    const churned = events.filter((e) => e._id.r === 'expire');

    return {
      active,
      free: Math.max(0, totalUsers - active),
      trials,
      premiumRate: totalUsers ? Math.round((active / totalUsers) * 1000) / 10 : 0,
      newSeries: fillSeries(range, newSubs.map((e) => ({ _id: e._id.d, value: e.n }))),
      churnSeries: fillSeries(range, churned.map((e) => ({ _id: e._id.d, value: e.n }))),
      /** 이력이 없던 시절은 셀 수 없다. 화면이 "언제부터" 를 말해야 한다 */
      eventsSince: await this.subEventModel
        .findOne()
        .sort({ at: 1 })
        .select('at')
        .lean()
        .then((r) => r?.at?.toISOString() ?? null),
      unavailable: UNAVAILABLE_METRICS.filter((m) => m.key === 'mrr'),
    };
  }

  // ─────────────────────────── 리텐션 ───────────────────────────

  /**
   * 가입 주차별 코호트 리텐션.
   *
   * 이건 계측 없이도 정확하다 — 가입일(User.createdAt)과 학습일(UserStats.date)
   * 만으로 계산되고, 둘 다 예전부터 쌓여 있다.
   */
  async retention(weeks = 8) {
    const since = new Date(Date.now() - weeks * 7 * DAY_MS);
    const users = await this.userModel
      .find({ ...REAL_USERS, createdAt: { $gte: since } })
      .select('_id createdAt')
      .lean();
    if (!users.length) return { cohorts: [] };

    const stats = await this.statsModel
      .find({ userId: { $in: users.map((u) => u._id) } })
      .select('userId date')
      .lean();

    const activity = new Map<string, Set<number>>();
    const signup = new Map<string, number>();
    for (const u of users) {
      signup.set(String(u._id), new Date((u as any).createdAt).getTime());
    }
    for (const s of stats) {
      const start = signup.get(String(s.userId));
      if (start === undefined) continue;
      const dayIdx = Math.floor((new Date(s.date).getTime() - start) / DAY_MS);
      if (dayIdx < 0) continue;
      const set = activity.get(String(s.userId)) ?? new Set<number>();
      set.add(dayIdx);
      activity.set(String(s.userId), set);
    }

    // 주 단위 코호트 × D1/D7/D30
    const buckets = new Map<string, { size: number; d1: number; d7: number; d30: number }>();
    for (const u of users) {
      const created = new Date((u as any).createdAt);
      const wk = weekKey(created);
      const b = buckets.get(wk) ?? { size: 0, d1: 0, d7: 0, d30: 0 };
      b.size += 1;
      const days = activity.get(String(u._id)) ?? new Set<number>();
      const age = Math.floor((Date.now() - created.getTime()) / DAY_MS);
      // 아직 그 날짜에 도달하지 않은 코호트는 분모에서 빼야 한다.
      // 안 그러면 최근 코호트의 D30 이 항상 0% 로 보인다
      if (age >= 1 && hasAround(days, 1)) b.d1 += 1;
      if (age >= 7 && hasAround(days, 7)) b.d7 += 1;
      if (age >= 30 && hasAround(days, 30)) b.d30 += 1;
      buckets.set(wk, b);
    }

    return {
      cohorts: [...buckets.entries()]
        .sort(([a], [b]) => (a < b ? -1 : 1))
        .map(([week, b]) => ({
          week,
          size: b.size,
          d1: pct(b.d1, b.size),
          d7: pct(b.d7, b.size),
          d30: pct(b.d30, b.size),
        })),
    };
  }

  // ─────────────────────────── 내부 ───────────────────────────

  /** 그 기간에 **실제로 학습한** 고유 유저 수 */
  private async distinctLearners(from: Date, to: Date): Promise<number> {
    const r = await this.statsModel
      .aggregate<{ n: number }>([
        {
          $match: {
            date: { $gte: from, $lte: to },
            $or: [{ totalQuestions: { $gt: 0 } }, { xpEarned: { $gt: 0 } }],
          },
        },
        { $group: { _id: '$userId' } },
        { $count: 'n' },
      ])
      .exec();
    return r[0]?.n ?? 0;
  }

  private async dauSeries(range: DateRange) {
    const rows = await this.statsModel
      .aggregate<{ _id: string; value: number }>([
        {
          $match: {
            date: { $gte: range.from, $lte: range.to },
            $or: [{ totalQuestions: { $gt: 0 } }, { xpEarned: { $gt: 0 } }],
          },
        },
        { $group: { _id: { d: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, u: '$userId' } } },
        { $group: { _id: '$_id.d', value: { $sum: 1 } } },
      ])
      .exec();
    return fillSeries(range, rows);
  }

  private async signupSeries(range: DateRange) {
    const rows = await this.userModel
      .aggregate<{ _id: string; value: number }>([
        { $match: { ...REAL_USERS, createdAt: { $gte: range.from, $lte: range.to } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            value: { $sum: 1 },
          },
        },
      ])
      .exec();
    return fillSeries(range, rows);
  }

  private countSignups(from: Date, to: Date) {
    return this.userModel.countDocuments({
      ...REAL_USERS,
      createdAt: { $gte: from, $lte: to },
    });
  }

  private async studyTotals(from: Date, to: Date) {
    const [agg, lessons] = await Promise.all([
      this.statsModel
        .aggregate<{ seconds: number; learners: number }>([
          { $match: { date: { $gte: from, $lte: to } } },
          { $group: { _id: '$userId', seconds: { $sum: '$studyTimeSeconds' } } },
          { $group: { _id: null, seconds: { $sum: '$seconds' }, learners: { $sum: 1 } } },
        ])
        .exec(),
      this.progressModel.countDocuments({
        isCompleted: true,
        completedAt: { $gte: from, $lte: to },
      }),
    ]);
    const a = agg[0];
    return {
      lessons,
      avgMinutes: a?.learners
        ? Math.round((a.seconds / a.learners / 60) * 10) / 10
        : 0,
    };
  }

  /** 지금 프리미엄인 사람 수 (한 사람이 구독을 여러 건 가질 수 있어 고유로 센다) */
  private async countActiveSubscriptions(): Promise<number> {
    const r = await this.subModel
      .aggregate<{ n: number }>([
        {
          $match: {
            status: { $in: [...ENTITLED_STATUSES] },
            expiresAt: { $gt: new Date() },
          },
        },
        { $group: { _id: '$userId' } },
        { $count: 'n' },
      ])
      .exec();
    return r[0]?.n ?? 0;
  }
}

function kpi(
  key: string,
  value: number,
  prev: number | null,
  sparkline: number[],
  extra: { unit?: string; note?: string } = {},
) {
  return {
    key,
    value,
    prev,
    deltaPct: prev === null ? null : deltaPct(value, prev),
    sparkline,
    ...extra,
  };
}

function pct(n: number, d: number): number | null {
  if (!d) return null;
  return Math.round((n / d) * 1000) / 10;
}

/** 그 날짜 근처(±1일)에 학습했나. 하루 경계가 시간대마다 달라 딱 맞추면 놓친다 */
function hasAround(days: Set<number>, target: number): boolean {
  return days.has(target) || days.has(target - 1) || days.has(target + 1);
}

/** ISO 주차 키 (2026-W07) */
function weekKey(d: Date): string {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = x.getUTCDay() || 7;
  x.setUTCDate(x.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(x.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((x.getTime() - yearStart.getTime()) / DAY_MS + 1) / 7);
  return `${x.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}
