import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { dayKey, resolveTimezone } from '../common/date.util';
import { GemLedgerService } from '../gem-ledger/gem-ledger.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  APP_REVIEW,
  type AppReviewDismissMode,
  type AppReviewSkipReason,
} from './app-review.const';
import type { CreateAppReviewDto } from './dto/app-review.dto';
import {
  AppReview,
  AppReviewDocument,
  AppReviewState,
  AppReviewStateDocument,
} from './schemas/app-review.schema';

type StateView = Pick<
  AppReviewState,
  'lastReviewAt' | 'snoozeUntil' | 'closeDay' | 'closeCount'
>;

/**
 * 지금 모달을 띄울지. 순수 함수라 시각·시간대만 바꿔 가며 테스트한다.
 * null 이면 띄운다.
 */
export function promptSkipReason(
  now: Date,
  today: string,
  user: { createdAt?: Date | null },
  state: Partial<StateView> | null,
): AppReviewSkipReason | null {
  const t = now.getTime();
  if (
    user.createdAt &&
    t - new Date(user.createdAt).getTime() < APP_REVIEW.MIN_ACCOUNT_AGE_MS
  ) {
    return 'too_new';
  }
  if (!state) return null;
  if (
    state.lastReviewAt &&
    t - new Date(state.lastReviewAt).getTime() < APP_REVIEW.COOLDOWN_MS
  ) {
    return 'reviewed';
  }
  if (state.snoozeUntil && new Date(state.snoozeUntil).getTime() > t) {
    return 'snoozed';
  }
  if (
    state.closeDay === today &&
    (state.closeCount ?? 0) >= APP_REVIEW.MAX_CLOSES_PER_DAY
  ) {
    return 'closed_today';
  }
  return null;
}

@Injectable()
export class AppReviewService {
  private readonly logger = new Logger(AppReviewService.name);

  constructor(
    @InjectModel(AppReview.name)
    private readonly reviews: Model<AppReviewDocument>,
    @InjectModel(AppReviewState.name)
    private readonly states: Model<AppReviewStateDocument>,
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    private readonly gemLedger: GemLedgerService,
  ) {}

  /** 홈에서 묻는다 — 지금 띄울까? */
  async promptFor(userId: string) {
    const uid = new Types.ObjectId(userId);
    const [user, state] = await Promise.all([
      this.users
        .findById(uid)
        .select('createdAt timezone')
        .lean<{ createdAt?: Date; timezone?: string }>(),
      this.states.findOne({ userId: uid }).lean<StateView>(),
    ]);
    const now = new Date();
    const today = dayKey(now, resolveTimezone(user?.timezone));
    const skip = user ? promptSkipReason(now, today, user, state) : 'too_new';
    return { show: skip === null, reward: APP_REVIEW.REWARD_GEMS };
  }

  /** "닫기" — 다음 실행에 다시. "하루 동안 보지 않기" — 24시간 뒤에 */
  async dismiss(userId: string, mode: AppReviewDismissMode) {
    const uid = new Types.ObjectId(userId);
    const now = new Date();
    if (mode === 'snooze') {
      await this.states.updateOne(
        { userId: uid },
        {
          $set: { snoozeUntil: new Date(now.getTime() + APP_REVIEW.SNOOZE_MS) },
        },
        { upsert: true },
      );
      return { ok: true };
    }

    const user = await this.users
      .findById(uid)
      .select('timezone')
      .lean<{ timezone?: string }>();
    const today = dayKey(now, resolveTimezone(user?.timezone));
    // 날이 바뀌었으면 1부터, 같은 날이면 +1
    const sameDay = await this.states.updateOne(
      { userId: uid, closeDay: today },
      { $inc: { closeCount: 1 } },
    );
    if (!sameDay.matchedCount) {
      await this.states.updateOne(
        { userId: uid },
        { $set: { closeDay: today, closeCount: 1 } },
        { upsert: true },
      );
    }
    return { ok: true };
  }

  /**
   * 평가를 받고 보석을 준다. 7일에 한 번 — 상태 문서의 조건부 upsert 가 막는다
   * (조건이 안 맞으면 같은 userId 로 새 문서를 넣으려다 unique 에 걸린다).
   */
  async submit(userId: string, dto: CreateAppReviewDto) {
    const uid = new Types.ObjectId(userId);
    const now = new Date();
    const since = new Date(now.getTime() - APP_REVIEW.COOLDOWN_MS);
    const before = await this.states
      .findOne({ userId: uid })
      .select('lastReviewAt')
      .lean<{ lastReviewAt?: Date | null }>();

    try {
      await this.states.updateOne(
        {
          userId: uid,
          $or: [{ lastReviewAt: null }, { lastReviewAt: { $lte: since } }],
        },
        { $set: { lastReviewAt: now, snoozeUntil: null } },
        { upsert: true },
      );
    } catch (error) {
      if ((error as { code?: number }).code === 11000) {
        throw new BadRequestException('APP_REVIEW_ALREADY');
      }
      throw error;
    }

    const reward = APP_REVIEW.REWARD_GEMS;
    try {
      await this.reviews.create({
        userId: uid,
        rating: dto.rating,
        comment: (dto.comment ?? '').trim(),
        platform: dto.platform ?? null,
        appVersion: dto.appVersion ?? null,
        locale: dto.locale ?? null,
        rewardGems: reward,
      });
    } catch (error) {
      // 평가를 못 남겼으면 이번 주 칸을 되돌린다 — 다시 보내면 받을 수 있게
      await this.states
        .updateOne(
          { userId: uid, lastReviewAt: now },
          { $set: { lastReviewAt: before?.lastReviewAt ?? null } },
        )
        .catch(() => undefined);
      this.logger.error(`앱 평가 저장 실패: user=${userId} ${String(error)}`);
      throw new BadRequestException('APP_REVIEW_FAILED');
    }

    await this.users.updateOne({ _id: uid }, { $inc: { gems: reward } });
    await this.gemLedger.record(uid, reward, 'app_review', {
      rating: dto.rating,
    });

    const after = await this.users
      .findById(uid)
      .select('gems')
      .lean<{ gems?: number }>();
    return { reward, gems: after?.gems ?? 0 };
  }

  async listForAdmin(query: {
    page?: string;
    pageSize?: string;
    rating?: string;
  }) {
    const page = Number(query.page ?? 1);
    const pageSize = Number(query.pageSize ?? 20);
    const rating = query.rating ? Number(query.rating) : null;
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 50 ||
      (rating !== null &&
        (!Number.isInteger(rating) || rating < 1 || rating > 5))
    ) {
      throw new BadRequestException('INVALID_APP_REVIEW_FILTER');
    }
    const filter = rating !== null ? { rating } : {};

    const [rows, total, dist] = await Promise.all([
      this.reviews
        .find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean<(AppReview & { _id: Types.ObjectId })[]>(),
      this.reviews.countDocuments(filter),
      this.reviews.aggregate<{ _id: number; count: number }>([
        { $group: { _id: '$rating', count: { $sum: 1 } } },
      ]),
    ]);

    const users = await this.users
      .find({ _id: { $in: rows.map((r) => r.userId) } })
      .select('nickname username email')
      .lean<
        {
          _id: Types.ObjectId;
          nickname?: string;
          username?: string;
          email?: string;
        }[]
      >();
    const byId = new Map(users.map((u) => [String(u._id), u]));

    const distribution = [1, 2, 3, 4, 5].map(
      (r) => dist.find((d) => d._id === r)?.count ?? 0,
    );
    const count = distribution.reduce((a, b) => a + b, 0);
    const average = count
      ? distribution.reduce((sum, n, i) => sum + n * (i + 1), 0) / count
      : 0;

    return {
      items: rows.map((row) => {
        const u = byId.get(String(row.userId));
        return {
          id: String(row._id),
          userId: String(row.userId),
          nickname: u?.nickname ?? u?.username ?? null,
          email: u?.email ?? null,
          rating: row.rating,
          comment: row.comment,
          platform: row.platform,
          appVersion: row.appVersion,
          locale: row.locale,
          createdAt: row.createdAt?.toISOString() ?? null,
        };
      }),
      total,
      page,
      pageSize,
      stats: { count, average: Math.round(average * 100) / 100, distribution },
    };
  }
}
