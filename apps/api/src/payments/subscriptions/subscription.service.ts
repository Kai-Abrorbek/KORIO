import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { trialDaysLeft } from '../../users/super.util';
import {
  Subscription,
  SubscriptionDocument,
} from './subscription.schema';
import {
  ENTITLED_STATUSES,
  type PaymentProviderId,
  type SubscriptionStatus,
  type VerifiedPurchase,
} from './subscription.types';

/** 새 구독을 시작할 때 한 번 주는 보석 */
const WELCOME_GEM_GRANT = 500;

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    @InjectModel(Subscription.name)
    private readonly subModel: Model<SubscriptionDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
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

    await this.subModel.updateMany(
      {
        userId: new Types.ObjectId(userId),
        provider: v.provider,
        externalTransactionId: v.externalSubscriptionId,
      },
      { $set: { status: 'expired' as SubscriptionStatus, autoRenew: false } },
    );
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

  /** 이 계정에서 지금 살아있는 구독 (플랫폼 무관 — 웹에서 산 것도 앱에서 통한다) */
  async findActive(userId: string): Promise<SubscriptionDocument | null> {
    const subs = await this.subModel
      .find({
        userId: new Types.ObjectId(userId),
        status: { $in: ENTITLED_STATUSES },
        expiresAt: { $gt: new Date() },
      })
      .sort({ expiresAt: -1 })
      .limit(1);
    return subs[0] ?? null;
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
  async syncUser(userId: string) {
    const active = await this.findActive(userId);
    const user = await this.userModel
      .findById(userId)
      .select('superPlan superExpiresAt isSuper')
      .lean();
    if (!user) return;

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
      return;
    }

    // 결제 구독이 없다. 체험이 아직 살아있으면 건드리지 않는다.
    const onTrial =
      (user as any).superPlan === 'trial' &&
      (user as any).superExpiresAt &&
      new Date((user as any).superExpiresAt).getTime() > Date.now();
    if (onTrial) return;

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
  }

  /** GET /subscriptions/me — 앱이 프리미엄 권한을 판단하는 단 하나의 창구 */
  async getMySubscription(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('isSuper superExpiresAt superPlan')
      .lean();
    if (!user) throw new NotFoundException('User not found');

    const active = await this.findActive(userId);
    if (active) {
      return {
        isPremium: true,
        isSuper: true, // 기존 클라 호환
        tier: active.tier ?? 'super',
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
      plan: onTrial ? 'trial' : null,
      provider: null,
      platform: null,
      productId: null,
      status: onTrial ? ('active' as SubscriptionStatus) : null,
      expiresAt: onTrial ? (user as any).superExpiresAt : null,
      autoRenew: false,
      isTrial: !!onTrial,
      trialDaysLeft: daysLeft,
    };
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
