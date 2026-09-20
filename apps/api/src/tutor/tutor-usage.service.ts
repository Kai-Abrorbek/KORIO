import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
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
  /**
   * @param model 이 세션을 **실제로** 돌린 대화 모델.
   *
   * ⚠️ 여기서 상수를 읽지 않는다. 예전엔 `model: TUTOR_MODEL` 로 박혀 있었는데,
   *    전송을 Gemini 로 바꾼 뒤에도 DB 에는 `gpt-realtime-2.1-mini` 가 계속
   *    쌓였다. 실행은 안 깨지지만 **원가 분석과 모델 비교가 통째로 틀린다** —
   *    그 숫자로 쿼터를 정하게 되니 조용히 위험한 종류의 버그다.
   *    부르는 쪽이 자기가 쓴 모델을 넘긴다.
   */
  async open(
    userId: string,
    mode: TutorMode,
    model: string,
    scene?: string,
    topic?: string,
    teacher?: { id: string; tts: { provider: string; voiceId: string } },
  ): Promise<TutorSessionDocument> {
    const doc = new this.sessionModel({
      userId: new Types.ObjectId(userId),
      mode,
      scene,
      topic,
      teacherId: teacher?.id,
      // 선생님 프로필 기준값. 폴백이 돌면 실제 발음 업체는 달라질 수 있다
      ttsProvider: teacher?.tts.provider,
      ttsVoiceId: teacher?.tts.voiceId,
      startedAt: new Date(),
      durationSec: 60,
      finalized: false,
      // 어떤 모델로 돌았는지 남긴다 — 모델을 바꿔가며 비교할 때 근거가 된다
      model,
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
   * **시작도 못 한** 세션을 0 초로 닫는다.
   *
   * close() 에는 10초 하한이 있다 — "연결만 하고 끊어도 API 호출은 일어났다"
   * 는 뜻이라 거기선 맞는 규칙이다. 하지만 LiveKit 방을 못 만들거나 Agent
   * dispatch 가 실패한 경우는 **대화 모델을 한 번도 부르지 않았다.** 원가가
   * 0 인데 쿼터를 깎으면, 우리 쪽 장애로 유저 사용량이 줄어든다.
   *
   * (초기 연결이 자주 실패하던 시기에 실패만으로 하루 한도가 차는 일이
   *  실제로 가능했다. close(…, 0) 이 10초로 올라가고 있었다.)
   *
   * ⚠️ 서버 내부에서만 부른다. 엔드포인트로 노출하면 아무 세션이나 0 초로
   *    닫아서 쿼터를 무한히 쓸 수 있다.
   */
  async abort(userId: string, sessionId: string) {
    if (!Types.ObjectId.isValid(sessionId)) return null;
    const session = await this.sessionModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(sessionId),
        userId: new Types.ObjectId(userId),
        finalized: false,
      },
      { $set: { durationSec: 0, endedAt: new Date(), finalized: true } },
      { new: true },
    );
    if (session) {
      // 얼마나 자주 실패하는지는 로그로만 센다. 실패 세션도 행은 남겨둬서
      // 나중에 "dispatch 실패율" 을 뽑을 수 있게 한다
      this.logger.warn(`세션 ${sessionId} 를 0초로 중단 처리했다 (연결 실패)`);
    }
    return session;
  }

  /**
   * 종료 보고 없이 방치된 세션 정리.
   *
   * ⚠️ 이 함수는 만들어만 두고 **아무도 부르지 않았다.** 그래서 앱이 종료
   *    보고를 못 보낸 세션(강제종료·네트워크 끊김·조작)은 선차감 1분만 깎인
   *    채로 영원히 열려 있었다. 실제로는 최대 10분을 썼을 수 있는데 1분만
   *    깎이는 것이고, 튜터는 우리 서비스에서 가장 비싼 기능이다.
   *    아래 cron 이 이제 주기적으로 부른다.
   *
   * 실제 경과 시간으로 정정한다. 클라가 안 알려줬다고 우리가 낸 돈이 사라지는
   * 건 아니다 — 앱은 maxDurationSec 에서 스스로 끊게 돼 있으므로, 보고가
   * 없으면 그 상한까지 썼다고 본다. 네트워크가 끊겨 억울한 경우가 생길 수
   * 있지만, 반대쪽(무제한 무료)이 훨씬 위험하다.
   */
  async finalizeStale(olderThanMin = MAX_SESSION_MINUTES * 2) {
    const cutoff = new Date(Date.now() - olderThanMin * 60 * 1000);
    const stale = await this.sessionModel
      .find({ finalized: false, startedAt: { $lt: cutoff } })
      .select('_id startedAt durationSec')
      .limit(200);

    for (const doc of stale) {
      const elapsedSec = Math.ceil(
        (Date.now() - new Date(doc.startedAt).getTime()) / 1000,
      );
      const charged = Math.min(elapsedSec, MAX_SESSION_MINUTES * 60);
      await this.sessionModel.updateOne(
        { _id: doc._id, finalized: false },
        {
          $set: {
            finalized: true,
            endedAt: new Date(),
            // 선차감(60초)보다 적게 잡히는 일은 없게
            durationSec: Math.max(doc.durationSec ?? 0, charged),
          },
        },
      );
    }
    if (stale.length) {
      this.logger.warn(
        `종료 보고 없는 튜터 세션 ${stale.length}건을 서버가 닫았다`,
      );
    }
    return stale.length;
  }

  /**
   * 방치된 세션을 서버가 직접 닫는다.
   *
   * 클라의 종료 보고에만 기대면, 보고를 안 보내는 것만으로 원가 통제가
   * 무너진다. 10분 넘게 열려 있는 세션은 어차피 앱이 스스로 끊었어야 하는
   * 것들이라 여기서 정리해도 정상 사용자는 영향이 없다.
   */
  @Cron('7,37 * * * *')
  async sweepStaleSessions() {
    try {
      await this.finalizeStale();
    } catch (e) {
      this.logger.warn(`방치 세션 정리 실패: ${(e as Error).message}`);
    }
  }
}
