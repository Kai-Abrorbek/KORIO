import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import {
  User,
  UserDocument,
  UserLeague,
} from '../../users/schemas/user.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../../users/schemas/user-stats.schema';
import {
  LeagueRoom,
  LeagueRoomDocument,
} from '../../league/schemas/league-room.schema';
import {
  APP_TIMEZONE,
  LEAGUE_TIMEZONE,
  dayKey as localDayKey,
} from '../../common/date.util';
import { getWeekKey } from '../../league/league.week';
import {
  XP_AWARD_DIVISOR,
  DAILY_XP_CAP,
  SINGLE_GRANT_XP_CAP,
  COMBO_XP_PER,
  PRACTICE_BASE_XP,
  STREAK_CHEST_EVERY_DAYS,
  STREAK_CHEST_GEMS,
} from '../../lessons/economy.const';
import {
  DAILY_QUESTS,
  MONTHLY_CHALLENGE,
  STREAK_FREEZE,
  STREAK_GOALS,
} from '../../retention/retention.config';
import { ENERGY_CONFIG } from '../../energy/energy.constants';
import {
  CHALLENGE_COOLDOWN_SEC,
  CHALLENGE_DAILY_LIMIT,
  CHALLENGE_MAX_SCORE,
  TIER_CHALLENGE,
} from '../../challenge/league-challenge.const';
import {
  DateRange,
  dayKey,
  fillSeries,
  resolveRange,
} from '../analytics/range.util';

const DAY_MS = 86_400_000;
const REAL_USERS = { isBot: { $ne: true } };
const XP_BUCKETS = [
  { key: '0-99', label: '0–99', min: 0, max: 100 },
  { key: '100-499', label: '100–499', min: 100, max: 500 },
  { key: '500-999', label: '500–999', min: 500, max: 1000 },
  { key: '1000-4999', label: '1,000–4,999', min: 1000, max: 5000 },
  { key: '5000-9999', label: '5,000–9,999', min: 5000, max: 10000 },
  { key: '10000+', label: '10,000+', min: 10000, max: null },
] as const;
const STREAK_BUCKETS = [
  { key: '0', label: '0일', min: 0, max: 1 },
  { key: '1-3', label: '1–3일', min: 1, max: 4 },
  { key: '4-7', label: '4–7일', min: 4, max: 8 },
  { key: '8-14', label: '8–14일', min: 8, max: 15 },
  { key: '15-30', label: '15–30일', min: 15, max: 31 },
  { key: '31+', label: '31일+', min: 31, max: null },
] as const;

type BucketRow = { _id: number | string; count: number };
type UserFacets = {
  summary: {
    users: number;
    lifetimeXp: number;
    streakSum: number;
    streakUsers: number;
  }[];
  xp: BucketRow[];
  streak: BucketRow[];
  leagues: BucketRow[];
};

function bucketStage(
  field: string,
  ranges: readonly { key: string; min: number; max: number | null }[],
): PipelineStage.Bucket {
  return {
    $bucket: {
      groupBy: { $max: [0, { $ifNull: [`$${field}`, 0] }] },
      boundaries: ranges.map((item) => item.min),
      default: ranges[ranges.length - 1].key,
      output: { count: { $sum: 1 } },
    },
  };
}

function bucketValues(
  ranges: readonly {
    key: string;
    label: string;
    min: number;
    max: number | null;
  }[],
  rows: BucketRow[],
) {
  const counts = new Map(rows.map((row) => [String(row._id), row.count]));
  return ranges.map((item) => ({
    key: item.key,
    label: item.label,
    count: counts.get(item.max === null ? item.key : String(item.min)) ?? 0,
  }));
}

@Injectable()
export class AdminGamificationService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @InjectModel(UserStats.name)
    private readonly stats: Model<UserStatsDocument>,
    @InjectModel(LeagueRoom.name)
    private readonly rooms: Model<LeagueRoomDocument>,
  ) {}

  private localStats(range: DateRange): PipelineStage[] {
    return [
      {
        $match: {
          date: {
            $gte: new Date(range.from.getTime() - DAY_MS),
            $lte: new Date(range.to.getTime() + DAY_MS),
          },
        },
      },
      {
        $lookup: {
          from: this.users.collection.name,
          localField: 'userId',
          foreignField: '_id',
          pipeline: [{ $project: { nickname: 1, timezone: 1, isBot: 1 } }],
          as: '_user',
        },
      },
      {
        $match: { '_user.0': { $exists: true }, '_user.isBot': { $ne: true } },
      },
      {
        $addFields: {
          _adminTimezone: {
            $let: {
              vars: { timezone: { $arrayElemAt: ['$_user.timezone', 0] } },
              in: {
                $cond: [
                  { $in: ['$$timezone', [null, '']] },
                  APP_TIMEZONE,
                  '$$timezone',
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          _adminLocalDay: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$date',
              timezone: '$_adminTimezone',
            },
          },
        },
      },
      {
        $match: {
          _adminLocalDay: { $gte: dayKey(range.from), $lte: dayKey(range.to) },
        },
      },
    ];
  }

  async overview(from?: string, to?: string) {
    const range = resolveRange(from, to);
    const now = new Date();
    const month = localDayKey(now, APP_TIMEZONE).slice(0, 7);
    const weekKey = getWeekKey(now);
    const [daily, xpEarners, current, leagueRooms, monthly, alerts] =
      await Promise.all([
        this.stats
          .aggregate<{
            _id: string;
            value: number;
            learners: number;
          }>([
            ...this.localStats(range),
            {
              $group: {
                _id: '$_adminLocalDay',
                value: { $sum: { $ifNull: ['$xpEarned', 0] } },
                learners: {
                  $sum: {
                    $cond: [
                      {
                        $or: [
                          { $gt: ['$totalQuestions', 0] },
                          { $gt: ['$xpEarned', 0] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
          ])
          .exec(),
        this.stats
          .aggregate<{
            n: number;
          }>([
            ...this.localStats(range),
            { $match: { xpEarned: { $gt: 0 } } },
            { $group: { _id: '$userId' } },
            { $count: 'n' },
          ])
          .exec(),
        this.users
          .aggregate<UserFacets>([
            { $match: REAL_USERS },
            {
              $facet: {
                summary: [
                  {
                    $group: {
                      _id: null,
                      users: { $sum: 1 },
                      lifetimeXp: { $sum: { $ifNull: ['$totalXP', 0] } },
                      streakSum: { $sum: { $ifNull: ['$streak', 0] } },
                      streakUsers: {
                        $sum: { $cond: [{ $gt: ['$streak', 0] }, 1, 0] },
                      },
                    },
                  },
                ],
                xp: [bucketStage('totalXP', XP_BUCKETS)],
                streak: [bucketStage('streak', STREAK_BUCKETS)],
                leagues: [
                  {
                    $group: {
                      _id: { $ifNull: ['$league', UserLeague.BRONZE] },
                      count: { $sum: 1 },
                    },
                  },
                ],
              },
            },
          ])
          .exec(),
        this.rooms
          .aggregate<{ rooms: number; participants: number }>([
            { $match: { weekKey, settled: false } },
            {
              $facet: {
                rooms: [{ $count: 'n' }],
                participants: [
                  { $unwind: '$members' },
                  { $group: { _id: '$members' } },
                  {
                    $lookup: {
                      from: this.users.collection.name,
                      localField: '_id',
                      foreignField: '_id',
                      as: 'user',
                    },
                  },
                  {
                    $match: {
                      'user.0': { $exists: true },
                      'user.isBot': { $ne: true },
                    },
                  },
                  { $count: 'n' },
                ],
              },
            },
            {
              $project: {
                rooms: { $ifNull: [{ $arrayElemAt: ['$rooms.n', 0] }, 0] },
                participants: {
                  $ifNull: [{ $arrayElemAt: ['$participants.n', 0] }, 0],
                },
              },
            },
          ])
          .exec(),
        this.users
          .aggregate<{
            participants: number;
            claims: number;
            completed: number;
          }>([
            { $match: { ...REAL_USERS, 'monthlyQuest.month': month } },
            {
              $group: {
                _id: null,
                participants: {
                  $sum: { $cond: [{ $gt: ['$monthlyQuest.count', 0] }, 1, 0] },
                },
                claims: { $sum: { $ifNull: ['$monthlyQuest.count', 0] } },
                completed: {
                  $sum: {
                    $cond: [
                      {
                        $gte: ['$monthlyQuest.count', MONTHLY_CHALLENGE.TARGET],
                      },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
          ])
          .exec(),
        this.stats
          .aggregate<{
            userId: string;
            nickname: string;
            date: string;
            xp: number;
          }>([
            ...this.localStats(range),
            { $match: { xpEarned: { $gte: Math.round(DAILY_XP_CAP * 0.9) } } },
            { $sort: { xpEarned: -1 } },
            { $limit: 10 },
            {
              $project: {
                _id: 0,
                userId: { $toString: '$userId' },
                nickname: {
                  $ifNull: [{ $arrayElemAt: ['$_user.nickname', 0] }, ''],
                },
                date: '$_adminLocalDay',
                xp: '$xpEarned',
              },
            },
          ])
          .exec(),
      ]);
    const snapshot = current[0] ?? {
      summary: [],
      xp: [],
      streak: [],
      leagues: [],
    };
    const summary = snapshot.summary[0];
    const dayMap = new Map(daily.map((row) => [row._id, row]));
    const xpSeries = fillSeries(range, daily);
    return {
      range: {
        from: range.from.toISOString(),
        to: range.to.toISOString(),
        days: range.days,
      },
      xp: {
        earned: xpSeries.reduce((sum, point) => sum + point.value, 0),
        earners: xpEarners[0]?.n ?? 0,
        series: xpSeries.map((point) => ({
          ...point,
          learners: dayMap.get(point.date)?.learners ?? 0,
        })),
        lifetimeOnProfiles: summary?.lifetimeXp ?? 0,
        distribution: bucketValues(XP_BUCKETS, snapshot.xp),
      },
      streak: {
        usersWithStreak: summary?.streakUsers ?? 0,
        averageStored: summary?.users
          ? Math.round((summary.streakSum / summary.users) * 10) / 10
          : null,
        distribution: bucketValues(STREAK_BUCKETS, snapshot.streak),
      },
      league: {
        weekKey,
        timezone: LEAGUE_TIMEZONE,
        rooms: leagueRooms[0]?.rooms ?? 0,
        participants: leagueRooms[0]?.participants ?? 0,
        distribution: Object.values(UserLeague).map((tier) => ({
          tier,
          count: snapshot.leagues.find((row) => row._id === tier)?.count ?? 0,
        })),
      },
      quests: {
        month,
        participants: monthly[0]?.participants ?? 0,
        claims: monthly[0]?.claims ?? 0,
        completed: monthly[0]?.completed ?? 0,
        target: MONTHLY_CHALLENGE.TARGET,
      },
      alerts,
      definitions: {
        period:
          'XP 획득·획득자는 선택 기간의 사용자 현지 날짜 기준 UserStats 기록입니다.',
        snapshot:
          '누적 XP·Streak·리그 등급은 현재 사용자 문서의 저장값입니다. Streak는 계정 조회 전까지 갱신되지 않았을 수 있습니다.',
        league:
          '참여 인원은 이번 리그 주차의 방에 속한 실제 계정 수입니다. 봇은 제외합니다.',
        quests:
          '월간 퀘스트는 이번 달의 현재 저장 상태입니다. 과거 월별 참여 기록은 보존되지 않습니다.',
        alerts: `선택 기간 한 사용자·하루 XP가 상한 ${DAILY_XP_CAP.toLocaleString('ko-KR')}의 90% 이상인 검토 후보입니다. 부정행위 판정이 아닙니다.`,
        challenge:
          '챌린지 시도 배열은 당일 기록만 유지해 기간별 참여율을 정확히 계산할 수 없습니다.',
      },
    };
  }

  settings() {
    return {
      readOnly: true,
      note: '서버 코드가 실제 규칙의 기준입니다. 이 화면에서 수정할 수 없으며 변경하려면 코드 검토와 재배포가 필요합니다.',
      groups: [
        {
          title: 'XP',
          source: 'lessons/economy.const.ts',
          items: [
            {
              label: '시드 XP 지급 배율',
              value: XP_AWARD_DIVISOR,
              unit: '분모',
              key: 'XP_AWARD_DIVISOR',
            },
            {
              label: '하루 XP 상한',
              value: DAILY_XP_CAP,
              unit: 'XP',
              key: 'DAILY_XP_CAP',
            },
            {
              label: '요청당 XP 상한',
              value: SINGLE_GRANT_XP_CAP,
              unit: 'XP',
              key: 'SINGLE_GRANT_XP_CAP',
            },
            {
              label: '콤보 1회 보너스',
              value: COMBO_XP_PER,
              unit: 'XP',
              key: 'COMBO_XP_PER',
            },
            {
              label: '노드 복습 보상',
              value: PRACTICE_BASE_XP.nodeReview,
              unit: 'XP',
              key: 'PRACTICE_BASE_XP.nodeReview',
            },
            {
              label: '유닛 마무리 보상',
              value: PRACTICE_BASE_XP.unitFinal,
              unit: 'XP',
              key: 'PRACTICE_BASE_XP.unitFinal',
            },
          ],
        },
        {
          title: '연속 학습',
          source: 'lessons/economy.const.ts · retention/retention.config.ts',
          items: [
            {
              label: '연속 학습 상자 주기',
              value: STREAK_CHEST_EVERY_DAYS,
              unit: '일',
              key: 'STREAK_CHEST_EVERY_DAYS',
            },
            {
              label: '연속 학습 상자 보상',
              value: STREAK_CHEST_GEMS,
              unit: 'Gems',
              key: 'STREAK_CHEST_GEMS',
            },
            {
              label: '복구펜 가격',
              value: STREAK_FREEZE.PRICE_GEMS,
              unit: 'Gems',
              key: 'STREAK_FREEZE.PRICE_GEMS',
            },
            {
              label: '복구펜 최대 보유',
              value: STREAK_FREEZE.MAX_HOLD,
              unit: '개',
              key: 'STREAK_FREEZE.MAX_HOLD',
            },
          ],
        },
        {
          title: '퀘스트·에너지',
          source: 'retention/retention.config.ts · energy/energy.constants.ts',
          items: [
            {
              label: '퀘스트 활동량 경계 (보통)',
              value: DAILY_QUESTS.BAND_XP[0],
              unit: 'XP',
              key: 'DAILY_QUESTS.BAND_XP[0]',
            },
            {
              label: '퀘스트 활동량 경계 (많음)',
              value: DAILY_QUESTS.BAND_XP[1],
              unit: 'XP',
              key: 'DAILY_QUESTS.BAND_XP[1]',
            },
            {
              label: '월간 챌린지 목표',
              value: MONTHLY_CHALLENGE.TARGET,
              unit: '회',
              key: 'MONTHLY_CHALLENGE.TARGET',
            },
            {
              label: '최대 에너지',
              value: ENERGY_CONFIG.MAX,
              unit: 'Energy',
              key: 'ENERGY_CONFIG.MAX',
            },
            {
              label: '전체 회복 시간',
              value: ENERGY_CONFIG.FULL_REFILL_HOURS,
              unit: '시간',
              key: 'ENERGY_CONFIG.FULL_REFILL_HOURS',
            },
          ],
        },
        {
          title: '리그 챌린지',
          source: 'challenge/league-challenge.const.ts',
          items: [
            {
              label: '챌린지 쿨다운',
              value: CHALLENGE_COOLDOWN_SEC,
              unit: '초',
              key: 'CHALLENGE_COOLDOWN_SEC',
            },
            {
              label: '하루 최대 시도',
              value: CHALLENGE_DAILY_LIMIT,
              unit: '회',
              key: 'CHALLENGE_DAILY_LIMIT',
            },
            {
              label: '점수 절대 상한',
              value: CHALLENGE_MAX_SCORE,
              unit: '점',
              key: 'CHALLENGE_MAX_SCORE',
            },
          ],
        },
      ],
      streakGoals: STREAK_GOALS,
      questRewards: DAILY_QUESTS.REWARD,
      leagueChallenges: Object.entries(TIER_CHALLENGE).map(
        ([tier, config]) => ({ tier, ...config }),
      ),
    };
  }
}
