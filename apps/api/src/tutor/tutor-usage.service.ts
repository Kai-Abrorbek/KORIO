import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { startOfDay, startOfMonth } from '../common/date.util';
import { UsersService } from '../users/users.service';
import { isSuperActive } from '../users/super.util';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  DAILY_MINUTES,
  MAX_SESSION_MINUTES,
  MONTHLY_MINUTES,
  TUTOR_MODEL,
  type TutorMode,
  type TutorTier,
} from './tutor.const';
import {
  TutorSession,
  TutorSessionDocument,
} from './schemas/tutor-session.schema';

export interface TutorQuota {
  tier: TutorTier;
  isSuper: boolean;
  /** MAX 만 제대로 쓸 수 있다. 화면에서 업그레이드를 유도할 근거 */
  isMax: boolean;
  dailyLimitMin: number;
  monthlyLimitMin: number;
  dailyUsedMin: number;
  monthlyUsedMin: number;
  /** 지금 시작할 수 있는 최대 길이(분). 0 이면 못 쓴다 */
  allowedMin: number;
}

/**
 * 사용량과 한도.
 *
 * 하루·한 달 두 축으로 막는 이유: 하루 한도만 두면 매일 꽉 채우는 소수가
 * 월 원가를 통째로 태우고, 월 한도만 두면 하루에 다 써버리고 한 달 내내
 * 못 쓴다는 불만이 나온다.
 *
 * 경계는 유저 시간대로 자른다 — 우즈벡·한국 유저가 섞여 있어서 서버 시간
 * 기준으로 자르면 누군가는 자정이 오후에 온다.
 */
@Injectable()
export class TutorUsageService {
  private readonly logger = new Logger(TutorUsageService.name);

  constructor(
    @InjectModel(TutorSession.name)
    private readonly sessionModel: Model<TutorSessionDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly usersService: UsersService,
  ) {}

  async getQuota(userId: string): Promise<TutorQuota> {
    const user = await this.userModel
      .findById(userId)
      .select('isSuper superExpiresAt superTier')
      .lean();
    const isSuper = isSuperActive(user ?? {});
    // 구독이 만료됐으면 등급이 뭐였든 free 다
    const tier: TutorTier = !isSuper
      ? 'free'
      : (user as any)?.superTier === 'max'
        ? 'max'
        : 'super';

    const tz = await this.usersService.getTimezone(userId);
    const dayStart = startOfDay(new Date(), tz);
    const monthStart = startOfMonth(new Date(), tz);

    const [daily, monthly] = await Promise.all([
      this.usedSecondsSince(userId, dayStart),
      this.usedSecondsSince(userId, monthStart),
    ]);

    const dailyLimitMin = DAILY_MINUTES[tier];
    const monthlyLimitMin = MONTHLY_MINUTES[tier];
    const dailyUsedMin = Math.floor(daily / 60);
    const monthlyUsedMin = Math.floor(monthly / 60);

    const allowedMin = Math.max(
      0,
      Math.min(
        MAX_SESSION_MINUTES,
        dailyLimitMin - dailyUsedMin,
        monthlyLimitMin - monthlyUsedMin,
      ),
    );

    return {
      tier,
      isSuper,
      isMax: tier === 'max',
      dailyLimitMin,
      monthlyLimitMin,
      dailyUsedMin,
      monthlyUsedMin,
      allowedMin,
    };
  }

  private async usedSecondsSince(userId: string, since: Date): Promise<number> {
    const rows = await this.sessionModel.aggregate<{ total: number }>([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          startedAt: { $gte: since },
        },
      },
      { $group: { _id: null, total: { $sum: '$durationSec' } } },
    ]);
    return rows[0]?.total ?? 0;
  }

  /** 한도를 넘었으면 여기서 막는다. 토큰 발급 직전에 부른다 */
  async assertCanStart(userId: string): Promise<TutorQuota> {
    const quota = await this.getQuota(userId);
    if (quota.allowedMin <= 0) {
      throw new ForbiddenException(
        quota.dailyUsedMin >= quota.dailyLimitMin
          ? 'TUTOR_DAILY_LIMIT_REACHED'
          : 'TUTOR_MONTHLY_LIMIT_REACHED',
      );
    }
    return quota;
  }

  /**
   * 세션을 연다.
   *
   * 시작 시점에 durationSec 를 1분으로 **선차감**한다. 토큰만 받아놓고
   * 종료 보고를 안 보내는 경우(앱 강제 종료, 네트워크 끊김)에도 무한히
   * 재발급받을 수 없게 하려는 것이다. 정상 종료되면 실제 시간으로 정정한다.
   */
  async open(
    userId: string,
    mode: TutorMode,
    scene?: string,
    topic?: string,
  ): Promise<TutorSessionDocument> {
    const doc = new this.sessionModel({
      userId: new Types.ObjectId(userId),
      mode,
      scene,
      topic,
      startedAt: new Date(),
      durationSec: 60,
      finalized: false,
      // 어떤 모델로 돌았는지 남긴다 — 모델을 바꿔가며 비교할 때 근거가 된다
      model: TUTOR_MODEL,
    });
    return doc.save();
  }

  /**
   * 세션을 닫고 실제 사용 시간으로 정정한다.
   *
   * 클라가 보낸 durationSec 를 그대로 믿지 않는다 — 0 을 보내 쿼터를
   * 비우는 걸 막아야 한다. 서버가 아는 시작 시각과 지금 시각의 차이를
   * 상한으로 잡고, 그 안에서만 클라 값을 인정한다.
   */
  async close(userId: string, sessionId: string, reportedSec: number) {
    if (!Types.ObjectId.isValid(sessionId)) return null;

    const session = await this.sessionModel.findOne({
      _id: new Types.ObjectId(sessionId),
      userId: new Types.ObjectId(userId),
      finalized: false,
    });
    if (!session) return null;

    const elapsedSec = Math.ceil(
      (Date.now() - new Date(session.startedAt).getTime()) / 1000,
    );
    const capSec = Math.min(elapsedSec, MAX_SESSION_MINUTES * 60);
    const reported = Number.isFinite(reportedSec) ? Math.floor(reportedSec) : 0;
    // 최소 10초는 인정한다 — 연결만 하고 끊어도 API 호출은 일어났다
    const finalSec = Math.max(10, Math.min(Math.max(0, reported), capSec));

    session.durationSec = finalSec;
    session.endedAt = new Date();
    session.finalized = true;
    await session.save();
    return session;
  }

  /**
   * 종료 보고 없이 방치된 세션 정리.
   * 선차감 1분이 남아 있으므로 쿼터는 이미 지켜지고 있고, 여기서는
   * 기록을 닫아 통계가 어긋나지 않게만 한다.
   */
  async finalizeStale(olderThanMin = MAX_SESSION_MINUTES * 2) {
    const cutoff = new Date(Date.now() - olderThanMin * 60 * 1000);
    const res = await this.sessionModel.updateMany(
      { finalized: false, startedAt: { $lt: cutoff } },
      { $set: { finalized: true, endedAt: new Date() } },
    );
    return res.modifiedCount ?? 0;
  }
}
