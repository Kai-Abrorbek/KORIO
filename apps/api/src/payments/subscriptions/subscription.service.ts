import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubscriptionEventsService } from '../../analytics/subscription-events.service';
import { User, UserDocument } from '../../users/schemas/user.schema';
import {
  expiredSuperFields,
  isSuperStale,
  trialDaysLeft,
} from '../../users/super.util';
import {
  Subscription,
  SubscriptionDocument,
} from './subscription.schema';
import {
  ENTITLED_STATUSES,
  TIER_RANK,
  pickActiveSubscription,
  type PaymentProviderId,
  type SubscriptionCountry,
  type SubscriptionPlan,
  type SubscriptionPlatform,
  type SubscriptionStatus,
  type SubscriptionTier,
  type VerifiedPurchase,
} from './subscription.types';

/** 새 구독을 시작할 때 한 번 주는 보석 */
const WELCOME_GEM_GRANT = 500;
const DAY_MS = 86_400_000;

/** 한 번 사는 기간권 (자동 갱신 없음) — 지금은 텔레그램 Stars 만 쓴다 */
export interface OneTimePassInput {
  userId: string;
  provider: PaymentProviderId;
  platform: SubscriptionPlatform;
  country?: SubscriptionCountry;
  tier: SubscriptionTier;
  plan: SubscriptionPlan;
  productId: string;
  days: number;
  /** 결제 id. 같은 값은 한 번만 반영된다 */
  externalTransactionId: string;
  payerId?: string;
  priceMicros?: number | null;
  currency?: string;
}

export interface OneTimePassResult {
  /** false = 이미 반영된 결제 (재전송) */
  applied: boolean;
  tier: SubscriptionTier;
  startedAt: Date;
  expiresAt: Date;
}

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    @InjectModel(Subscription.name)
    private readonly subModel: Model<SubscriptionDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    // 구독 상태 전이 기록 (분석 전용). 실패해도 결제에 영향 없다
    private readonly subEvents: SubscriptionEventsService,
  ) {}

  /**
   * 검증을 마친 결제를 반영한다. Provider 가 무엇이든 여기로 들어온다.
   *
   * 멱등하다: 같은 externalTransactionId 로 몇 번을 불러도 구독은 한 건이고
   * 보석도 한 번만 나간다. (앱이 결제 도중 죽어 재전송 / 웹훅과 클라 요청이
   * 동시에 도착 / 유저가 복원 버튼을 연타 — 전부 같은 경로다)
   */
  async applyVerifiedPurchase(userId: string, v: VerifiedPurchase) {
    const uid = new Types.ObjectId(userId);

    // upsert 로 한 번에 집는다. 유니크 인덱스가 경합을 막아준다.
    const existing = await this.subModel.findOne({
      provider: v.provider,
      externalTransactionId: v.externalTransactionId,
    });

    // 환불로 회수한 결제는 되살리지 않는다. 권한 취소 없이 환불하면 스토어는
    // 계속 "활성/해지 예약"이라고 답해서, 웹훅·복원·갱신 안전망 어느 경로로든
    // 다시 들어오면 프리미엄이 살아난다
    if (existing?.revokedAt) {
      await this.syncUser(userId);
      return this.getMySubscription(userId);
    }

    // 이 유저가 처음 구독하는 것인지 (보석은 최초 1회만)
    const hadAny = existing
      ? existing.welcomeGrantGiven
      : await this.subModel.exists({ userId: uid, welcomeGrantGiven: true });

    const doc = await this.subModel.findOneAndUpdate(
      {
        provider: v.provider,
        externalTransactionId: v.externalTransactionId,
      },
      {
        $set: {
          userId: uid,
          platform: v.platform,
          country: v.country ?? 'OTHER',
          tier: v.tier,
          plan: v.plan,
          productId: v.productId,
          status: v.status,
          startedAt: v.startedAt,
          expiresAt: v.expiresAt,
          autoRenew: v.autoRenew,
          externalSubscriptionId: v.externalSubscriptionId,
          lastVerifiedAt: new Date(),
        },
        $setOnInsert: { welcomeGrantGiven: false },
      },
      { upsert: true, returnDocument: 'after' },
    );

    // 상태가 실제로 바뀌었을 때만 이력을 남긴다.
    // Subscription 문서는 제자리에서 덮어써지므로, 이 기록이 없으면
    // "어제 몇 명이 취소했나" 를 영원히 알 수 없다
    await this.subEvents.record({
      userId: uid,
      subscriptionId: doc._id,
      fromStatus: existing?.status ?? null,
      toStatus: v.status,
      provider: v.provider,
      plan: v.plan,
      productId: v.productId,
      reason: 'purchase',
    });

    // 같은 구독이 갱신될 때마다 보석을 또 주면 안 된다.
    if (!hadAny && !doc.welcomeGrantGiven && this.isEntitled(doc)) {
      doc.welcomeGrantGiven = true;
      await doc.save();
      await this.userModel.updateOne(
        { _id: uid },
        { $inc: { gems: WELCOME_GEM_GRANT } },
      );
    }

    await this.syncUser(userId);
    return this.getMySubscription(userId);
  }

  /**
   * 다른 결제·다른 기기에서 온 같은 구독을 정리한다.
   *
   * Google 은 갱신·업그레이드 때 purchaseToken 이 바뀌고 이전 토큰을
   * linkedPurchaseToken 으로 알려준다. 옛 건을 만료로 눕혀야 "활성 구독이
   * 두 개"로 보이지 않는다.
   */
  async supersede(userId: string, v: VerifiedPurchase) {
    if (!v.externalSubscriptionId) return;
    if (v.externalSubscriptionId === v.externalTransactionId) return;

    const superseded = await this.subModel
      .find({
        userId: new Types.ObjectId(userId),
        provider: v.provider,
        externalTransactionId: v.externalSubscriptionId,
      })
      .select('status plan productId')
      .lean();

    await this.subModel.updateMany(
      {
        userId: new Types.ObjectId(userId),
        provider: v.provider,
        externalTransactionId: v.externalSubscriptionId,
      },
      { $set: { status: 'expired' as SubscriptionStatus, autoRenew: false } },
    );

    // 갱신·업그레이드로 눕힌 건 진짜 이탈이 아니다. reason 으로 구분해두지
    // 않으면 어드민의 취소 추이가 갱신 때마다 튄다
    for (const old of superseded) {
      await this.subEvents.record({
        userId,
        subscriptionId: old._id,
        fromStatus: old.status,
        toStatus: 'expired',
        provider: v.provider,
        plan: old.plan,
        productId: old.productId,
        reason: 'supersede',
      });
    }
  }

  /** 지금 프리미엄을 줘야 하는 구독인지 */
  private isEntitled(sub: {
    status: SubscriptionStatus;
    expiresAt: Date;
  }): boolean {
    return (
      ENTITLED_STATUSES.includes(sub.status) &&
      new Date(sub.expiresAt).getTime() > Date.now()
    );
  }

  /**
   * 이 계정에서 지금 살아있는 구독 (플랫폼 무관 — 웹에서 산 것도 앱에서 통한다)
   *
   * 살아있는 게 여러 개면 **등급이 높은 것**이 이긴다. 만료일로만 고르면
   * SUPER 1년권을 쓰다 MAX 1개월을 산 유저가 SUPER 로 보인다 — MAX 값을
   * 냈는데 튜터를 못 쓴다. 같은 등급끼리는 늦게 끝나는 쪽.
   */
  async findActive(userId: string): Promise<SubscriptionDocument | null> {
    const subs = await this.subModel.find({
      userId: new Types.ObjectId(userId),
      status: { $in: ENTITLED_STATUSES },
      expiresAt: { $gt: new Date() },
    });
    return pickActiveSubscription(subs);
  }

  /**
   * 한 번 사는 기간권을 반영한다 (텔레그램 Stars).
   *
   * 같은 등급 이상이 이미 살아 있으면 **그 뒤에 이어 붙인다** — 지금부터 세면
   * 남은 기간을 버리게 된다. 아래 등급만 살아 있으면(SUPER 쓰는 중에 MAX 구매)
   * 지금 시작한다: 비싼 걸 샀으면 바로 써야 하고, SUPER 는 MAX 가 끝난 뒤에
   * 다시 이어진다 (syncUser · 만료 청소부가 그 경계를 다시 투영한다).
   *
   * 멱등: 같은 externalTransactionId 는 한 번만 들어간다. 웹훅이 재전송돼도
   * 날짜를 다시 계산하지 않는다. 한 유저의 결제가 동시에 두 건 들어오는 경우는
   * 호출하는 쪽(TelegramStarsService)이 유저별로 줄을 세운다.
   */
  async applyOneTimePass(input: OneTimePassInput): Promise<OneTimePassResult> {
    const uid = new Types.ObjectId(input.userId);
    const key = {
      provider: input.provider,
      externalTransactionId: input.externalTransactionId,
    };
    const already = async (): Promise<OneTimePassResult | null> => {
      const row = await this.subModel
        .findOne(key)
        .select('tier startedAt expiresAt')
        .lean();
      return row
        ? {
            applied: false,
            tier: row.tier ?? input.tier,
            startedAt: row.startedAt,
            expiresAt: row.expiresAt,
          }
        : null;
    };
    const existing = await already();
    if (existing) return existing;

    const now = new Date();
    const live = await this.subModel
      .find({
        userId: uid,
        status: { $in: ENTITLED_STATUSES },
        expiresAt: { $gt: now },
      })
      .select('tier expiresAt')
      .lean();
    const rank = TIER_RANK[input.tier];
    const startedAt = live
      .filter((s) => TIER_RANK[s.tier ?? 'super'] >= rank)
      .reduce((until, s) => (s.expiresAt > until ? s.expiresAt : until), now);
    const expiresAt = new Date(
      startedAt.getTime() + Math.max(1, Math.floor(input.days)) * DAY_MS,
    );

    // 보석은 이 계정의 첫 유료 구독에만
    const hadAny = await this.subModel.exists({
      userId: uid,
      welcomeGrantGiven: true,
    });

    let doc: SubscriptionDocument;
    try {
      doc = await this.subModel.create({
        userId: uid,
        provider: input.provider,
        platform: input.platform,
        country: input.country ?? 'OTHER',
        tier: input.tier,
        plan: input.plan,
        productId: input.productId,
        status: 'active',
        startedAt,
        expiresAt,
        autoRenew: false,
        externalTransactionId: input.externalTransactionId,
        payerId: input.payerId,
        priceMicros: input.priceMicros ?? null,
        currency: input.currency ?? '',
        welcomeGrantGiven: !hadAny,
        lastVerifiedAt: now,
      });
    } catch (error) {
      // 같은 결제가 동시에 두 번 들어왔다 — 먼저 들어간 쪽이 이미 반영했다
      if ((error as { code?: number })?.code === 11000) {
        const raced = await already();
        if (raced) return raced;
      }
      throw error;
    }

    if (!hadAny) {
      await this.userModel.updateOne(
        { _id: uid },
        { $inc: { gems: WELCOME_GEM_GRANT } },
      );
    }

    await this.subEvents.record({
      userId: uid,
      subscriptionId: doc._id,
      fromStatus: null,
      toStatus: 'active',
      provider: input.provider,
      plan: input.plan,
      productId: input.productId,
      reason: 'purchase',
    });

    await this.syncUser(input.userId);
    return { applied: true, tier: input.tier, startedAt, expiresAt };
  }

  /**
   * Subscription → User.isSuper 투영.
   *
   * 에너지·문법·로드맵·모바일 등 20곳 넘게 user.isSuper 를 읽고 있다.
   * 그 전부를 새 컬렉션으로 갈아엎는 건 배포 직전에 할 짓이 아니라서,
   * 진실은 Subscription 에 두고 결과만 기존 필드로 내려쓴다.
   * → 기존 코드는 한 줄도 안 바뀌고, 새 결제수단은 여기만 거치면 된다.
   *
   * 체험(trial)은 결제가 아니라 가입 시 붙는 것이라 구독이 없을 때만 남긴다.
   */
  async syncUser(userId: string): Promise<boolean> {
    const active = await this.findActive(userId);
    const user = await this.userModel
      .findById(userId)
      .select('superPlan superExpiresAt isSuper')
      .lean();
    if (!user) return false;

    if (active) {
      await this.userModel.updateOne(
        { _id: new Types.ObjectId(userId) },
        {
          $set: {
            isSuper: true,
            superTier: active.tier ?? 'super',
            superPlan: active.plan,
            superExpiresAt: active.expiresAt,
          },
        },
      );
      return true;
    }

    // 결제 구독이 없다. 체험이 아직 살아있으면 건드리지 않는다.
    const onTrial =
      (user as any).superPlan === 'trial' &&
      (user as any).superExpiresAt &&
      new Date((user as any).superExpiresAt).getTime() > Date.now();
    if (onTrial) return true;

    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          isSuper: false,
          superTier: 'super',
          superPlan: null,
          superExpiresAt: null,
        },
      },
    );
    return false;
  }

  /** GET /subscriptions/me — 앱이 프리미엄 권한을 판단하는 단 하나의 창구 */
  async getMySubscription(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('isSuper superExpiresAt superPlan trialStartedAt')
      .lean();
    if (!user) throw new NotFoundException('User not found');

    // 여기가 권한을 판단하는 창구다. 판단만 하고 DB 는 그대로 두면
    // 만료된 계정이 계속 isSuper: true 로 남아 있어서, 이 함수를 안 거치는
    // 코드가 하나라도 생기면 그 즉시 공짜 프리미엄이 된다. 발견하면 내린다.
    //
    // 단, 끝난 건 **한 구간**일 수 있다 — MAX 기간권이 끝나도 그 뒤로 이어 산
    // SUPER 가 남아 있으면 계속 SUPER 다. 그래서 무작정 내리지 않고 구독
    // 컬렉션에서 다시 투영한다 (남은 게 없으면 syncUser 가 내린다).
    if (isSuperStale(user as any)) {
      await this.syncUser(userId);
      Object.assign(user as any, expiredSuperFields());
    }

    const active = await this.findActive(userId);
    if (active) {
      return {
        isPremium: true,
        isSuper: true, // 기존 클라 호환
        tier: active.tier ?? 'super',
        /**
         * 지금 살 수 있는 등급.
         *
         * 앱이 "구독 중" 화면에서 뭘 권할지 여기 하나로 정한다. 예전엔 앱이
         * tier 와 isTrial 로 직접 추론했는데, 체험 중에는 아예 아무 요금제도
         * 못 보게 돼 있었다 — 체험 중에 MAX 를 사고 싶은 사람이 길이 없었다.
         */
        canUpgradeTo: upgradesFrom(active.tier ?? 'super'),
        plan: active.plan,
        provider: active.provider,
        platform: active.platform,
        productId: active.productId,
        status: active.status,
        expiresAt: active.expiresAt,
        autoRenew: active.autoRenew,
        isTrial: false,
        trialDaysLeft: null,
      };
    }

    // 결제 구독이 없으면 체험 여부를 본다
    const daysLeft = trialDaysLeft(user as any);
    const onTrial =
      (user as any).superPlan === 'trial' &&
      (user as any).superExpiresAt &&
      new Date((user as any).superExpiresAt).getTime() > Date.now();

    return {
      isPremium: !!onTrial,
      isSuper: !!onTrial,
      // 체험은 super 상당. 튜터(max 전용)는 체험으로 열리지 않는다
      tier: 'super' as const,
      // 체험 중이면 아직 아무것도 산 게 없다 — 둘 다 살 수 있다
      canUpgradeTo: ['super', 'max'] as SubscriptionTier[],
      plan: onTrial ? 'trial' : null,
      provider: null,
      platform: null,
      productId: null,
      status: onTrial ? ('active' as SubscriptionStatus) : null,
      expiresAt: onTrial ? (user as any).superExpiresAt : null,
      autoRenew: false,
      isTrial: !!onTrial,
      trialDaysLeft: daysLeft,
      // 이미 써버린 체험을 또 권하지 않도록
      hasUsedTrial: !!(user as any).trialStartedAt,
    };
  }

  /**
   * 만료된 SUPER 를 내리는 청소부.
   *
   * getMe / getMySubscription 이 이미 내리지만, 그건 **앱을 켠 사람만**
   * 해당된다. 체험이 끝나고 앱을 안 여는 계정은 DB 에 isSuper: true 로
   * 계속 남아, 유저 목록·통계·푸시 대상 산출처럼 isSuperActive 를 안 거치는
   * 코드가 하나만 생겨도 바로 새는 자리가 된다.
   * 한 시간마다 훑어서 DB 를 사실과 맞춰둔다.
   *
   * 무작정 내리지 않고 유저마다 syncUser 로 다시 투영한다. 끝난 게 한 구간일
   * 수 있어서다 — MAX 가 끝나도 뒤에 이어 산 SUPER(텔레그램 Stars 기간권,
   * 보석 기간권)가 남아 있으면 그게 새 superExpiresAt 이 된다. 예전처럼
   * updateMany 로 내리면 돈 내고 산 기간이 앱을 열 때까지 사라져 있었다.
   */
  @Cron('17 * * * *')
  async sweepExpiredSuper() {
    const stale = await this.userModel
      .find({ isSuper: true, superExpiresAt: { $ne: null, $lte: new Date() } })
      .select('_id')
      .limit(2000)
      .lean();
    let lowered = 0;
    let continued = 0;
    for (const user of stale) {
      try {
        if (await this.syncUser(user._id.toString())) continued++;
        else lowered++;
      } catch (error) {
        this.logger.warn(
          `만료 청소 실패: user=${String(user._id)} ${String(error)}`,
        );
      }
    }
    if (lowered || continued) {
      this.logger.log(
        `만료된 SUPER ${lowered}건 내림 · ${continued}건은 다음 구간으로 이어짐`,
      );
    }
    return { lowered, continued };
  }

  /**
   * 환불·차지백으로 무효화된 결제를 즉시 회수한다.
   *
   * 토큰이 정확히 같은 결제만 건드린다. 업그레이드로 이어진 새 구독은
   * externalSubscriptionId 가 옛 토큰을 가리키지만, 옛 결제(예: SUPER)를
   * 환불했다고 새로 산 MAX 까지 끊으면 안 된다.
   * 멱등: 이미 회수한 건 다시 처리하지 않는다.
   */
  async revokeRefunded(provider: PaymentProviderId, token: string) {
    const subs = await this.subModel.find({
      provider,
      externalTransactionId: token,
      revokedAt: { $exists: false },
    });
    if (!subs.length) {
      // 앱이 아직 서버에 알리지 않은 결제일 수 있다. 그 경우 검증 요청이
      // 오면 스토어가 이미 환불 상태를 돌려주거나, 갱신 안전망이 잡는다.
      this.logger.warn(`회수할 구독을 못 찾은 환불 알림 (${provider})`);
      return 0;
    }

    const now = new Date();
    for (const sub of subs) {
      await this.subModel.updateOne(
        { _id: sub._id },
        {
          $set: {
            status: 'expired' as SubscriptionStatus,
            autoRenew: false,
            revokedAt: now,
            lastVerifiedAt: now,
            expiresAt: sub.expiresAt < now ? sub.expiresAt : now,
          },
        },
      );
      await this.subEvents.record({
        userId: sub.userId,
        subscriptionId: sub._id,
        fromStatus: sub.status,
        toStatus: 'expired',
        provider: sub.provider,
        plan: sub.plan,
        productId: sub.productId,
        reason: 'refund',
      });
      await this.syncUser(sub.userId.toString());
    }
    this.logger.log(`환불로 구독 ${subs.length}건 회수`);
    return subs.length;
  }

  /** 웹훅/복원에서 토큰만으로 주인을 찾을 때 */
  async findByTransaction(
    provider: PaymentProviderId,
    externalTransactionId: string,
  ) {
    return this.subModel.findOne({ provider, externalTransactionId });
  }

  /** 검증 결과를 그대로 반영 (웹훅 경로 — userId 는 기존 구독에서 찾는다) */
  async applyFromWebhook(v: VerifiedPurchase) {
    const existing = await this.findByTransaction(
      v.provider,
      v.externalTransactionId,
    );
    const userId =
      existing?.userId?.toString() ??
      (
        await this.subModel.findOne({
          provider: v.provider,
          externalTransactionId: v.externalSubscriptionId,
        })
      )?.userId?.toString();

    if (!userId) {
      // 아직 앱이 서버에 알리지 않은 결제다. 앱이 곧 보내니 버려도 된다.
      this.logger.warn(
        `주인을 못 찾은 결제 알림 (${v.provider}) — 앱의 첫 보고를 기다린다`,
      );
      return null;
    }

    await this.supersede(userId, v);
    return this.applyVerifiedPurchase(userId, v);
  }
}

/** 이 등급에서 위로 갈 수 있는 등급들. 없으면 빈 배열 */
function upgradesFrom(tier: SubscriptionTier): SubscriptionTier[] {
  const ORDER: SubscriptionTier[] = ['super', 'max'];
  return ORDER.slice(ORDER.indexOf(tier) + 1);
}
