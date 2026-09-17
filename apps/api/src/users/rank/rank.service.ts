import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import {
  EXAM_CEIL,
  LEVEL_MAX,
  LONGEST_STREAK_CEIL,
  RANKED_FILTER,
  RANK_WEIGHTS,
  SCORE_SCALE,
  STREAK_CEIL,
  XP_CEIL,
  tierFor,
  xpGapFor,
} from './rank.const';

/**
 * 점수 계산식 — **몽고 표현식 하나로만 존재한다.**
 *
 * 같은 공식을 TS 로 한 벌 더 쓰면 언젠가 둘이 어긋난다. 그러면 "내 점수"와
 * "남들 점수"가 다른 잣대로 매겨져서, 아무도 눈치 못 채는 채로 순위가 틀린다.
 * 그래서 내 점수도 남의 점수도 **이 표현식으로만** 뽑는다.
 */
const SCORE_FIELDS = {
  // 실력 — 지금 어느 급수를 하고 있나 + 실제로 통과한 급수 시험
  // 급수는 직접 고를 수 있어서(placementLevelSetAt) 절반만 준다. 나머지 절반은
  // 시험으로 증명한 몫이다
  _prof: {
    $add: [
      {
        $multiply: [
          0.5,
          {
            $divide: [
              {
                $subtract: [
                  {
                    $min: [
                      { $max: [{ $ifNull: ['$placementLevel', 1] }, 1] },
                      LEVEL_MAX,
                    ],
                  },
                  1,
                ],
              },
              LEVEL_MAX - 1,
            ],
          },
        ],
      },
      {
        $multiply: [
          0.5,
          {
            $divide: [
              {
                $min: [
                  { $size: { $ifNull: ['$completedLevelExams', []] } },
                  EXAM_CEIL,
                ],
              },
              EXAM_CEIL,
            ],
          },
        ],
      },
    ],
  },
  // 학습량 — 로그 스케일 (rank.const 의 XP_CEIL 주석 참고)
  _vol: {
    $min: [
      1,
      {
        $divide: [
          { $ln: { $add: [1, { $max: [{ $ifNull: ['$totalXP', 0] }, 0] }] } },
          Math.log(1 + XP_CEIL),
        ],
      },
    ],
  },
  // 꾸준함 — 지금 이어지는 연속일에 무게를 더 둔다. 과거 기록보다 지금 오는 게 중요
  _cons: {
    $add: [
      {
        $multiply: [
          0.6,
          {
            $divide: [
              { $min: [{ $ifNull: ['$streak', 0] }, STREAK_CEIL] },
              STREAK_CEIL,
            ],
          },
        ],
      },
      {
        $multiply: [
          0.4,
          {
            $divide: [
              {
                $min: [
                  { $ifNull: ['$longestStreak', 0] },
                  LONGEST_STREAK_CEIL,
                ],
              },
              LONGEST_STREAK_CEIL,
            ],
          },
        ],
      },
    ],
  },
} as const;

const SCORE_EXPR = {
  $multiply: [
    SCORE_SCALE,
    {
      $add: [
        { $multiply: [RANK_WEIGHTS.proficiency, '$_prof'] },
        { $multiply: [RANK_WEIGHTS.volume, '$_vol'] },
        { $multiply: [RANK_WEIGHTS.consistency, '$_cons'] },
      ],
    },
  ],
};

export interface RankBreakdown {
  key: 'proficiency' | 'volume' | 'consistency';
  /** 0~1 */
  value: number;
  /** 화면이 "레벨 3급" 처럼 실제 값을 같이 보여주려고 */
  raw: number;
}

export interface MyRank {
  /** 아직 한 문제도 안 푼 사람 — 순위가 없다 */
  ranked: boolean;
  rank: number | null;
  total: number;
  /** 상위 몇 % (1 = 상위 1%) */
  percentile: number | null;
  tier: string | null;
  score: number;
  breakdown: RankBreakdown[];
  /** 한 칸 올라가는 데 필요한 XP. null = 학습량만으로는 못 따라잡는다 */
  xpToNextRank: number | null;
  computedAt: string;
}

@Injectable()
export class RankService {
  private readonly logger = new Logger(RankService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async myRank(userId: string): Promise<MyRank> {
    const uid = new Types.ObjectId(userId);

    // ── 1) 내 점수 ── 문서 하나라 비용이 없다
    const [me] = await this.userModel
      .aggregate<{
        _prof: number;
        _vol: number;
        _cons: number;
        _score: number;
        totalXP: number;
        placementLevel: number;
        streak: number;
        exams: number;
      }>([
        { $match: { _id: uid } },
        { $addFields: SCORE_FIELDS },
        { $addFields: { _score: SCORE_EXPR } },
        {
          $project: {
            _prof: 1,
            _vol: 1,
            _cons: 1,
            _score: 1,
            totalXP: { $ifNull: ['$totalXP', 0] },
            placementLevel: { $ifNull: ['$placementLevel', 1] },
            streak: { $ifNull: ['$streak', 0] },
            exams: { $size: { $ifNull: ['$completedLevelExams', []] } },
          },
        },
      ])
      .exec();

    const now = new Date().toISOString();
    const breakdown = (raw: typeof me): RankBreakdown[] => [
      { key: 'proficiency', value: raw?._prof ?? 0, raw: raw?.placementLevel ?? 1 },
      { key: 'volume', value: raw?._vol ?? 0, raw: raw?.totalXP ?? 0 },
      { key: 'consistency', value: raw?._cons ?? 0, raw: raw?.streak ?? 0 },
    ];

    // 한 번도 공부 안 한 사람은 분모에 없다 (RANKED_FILTER 주석 참고).
    // 0등으로 보여주는 것보다 "아직 없다 + 첫 레슨" 이 정직하고 할 일도 분명하다
    if (!me || me.totalXP <= 0) {
      const total = await this.userModel.countDocuments(RANKED_FILTER);
      return {
        ranked: false,
        rank: null,
        total,
        percentile: null,
        tier: null,
        score: Math.round(me?._score ?? 0),
        breakdown: breakdown(me),
        xpToNextRank: null,
        computedAt: now,
      };
    }

    // ── 2) 전체에서 내 자리 ──
    //
    // 정렬하지 않는다. 세어야 하는 건 "나보다 높은 사람 수" 뿐이라 한 번 훑으며
    // 카운트하면 끝이다. 정렬하면 유저 수만큼 메모리를 쓰고 32MB 제한에 걸린다.
    // 바로 위 사람 점수(_next)도 같은 패스에서 $min 으로 같이 집는다.
    const [agg] = await this.userModel
      .aggregate<{ total: number; better: number; next: number | null }>([
        { $match: RANKED_FILTER },
        { $addFields: SCORE_FIELDS },
        { $addFields: { _score: SCORE_EXPR } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            better: {
              $sum: { $cond: [{ $gt: ['$_score', me._score] }, 1, 0] },
            },
            next: {
              $min: {
                $cond: [{ $gt: ['$_score', me._score] }, '$_score', null],
              },
            },
          },
        },
      ])
      .exec();

    const total = agg?.total ?? 1;
    const rank = (agg?.better ?? 0) + 1;
    // 1등이면 상위 0% 가 아니라 상위 (1/total)% 다. 0% 는 존재할 수 없는 값이다
    const percentile = Math.max(0.1, Math.round((rank / total) * 1000) / 10);

    return {
      ranked: true,
      rank,
      total,
      percentile,
      tier: tierFor(percentile),
      score: Math.round(me._score),
      breakdown: breakdown(me),
      xpToNextRank:
        agg?.next == null ? null : xpGapFor(me.totalXP, agg.next - me._score),
      computedAt: now,
    };
  }
}
