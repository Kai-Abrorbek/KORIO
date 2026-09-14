import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import {
  Subscription,
  SubscriptionDocument,
} from '../subscriptions/subscription.schema';
import { SubscriptionService } from '../subscriptions/subscription.service';
import { SubscriptionEventsService } from '../../analytics/subscription-events.service';
import { ENTITLED_STATUSES } from '../subscriptions/subscription.types';
import {
  GEM_PASSES,
  GEM_PASS_MAX_STACK_DAYS,
  gemPassById,
} from './gem-pass.const';

const DAY_MS = 86_400_000;

/**
 * 보석 → 프리미엄 기간.
 *
 * 결제 흐름을 전혀 건드리지 않는다. Subscription 컬렉션에 provider: 'gems' 행을
 * 하나 만들고, 기존 syncUser() 가 그걸 user.isSuper 로 투영한다 — 에너지·문법·
 * 로드맵 등 20곳 넘는 기존 코드는 한 줄도 안 바뀐다.
 */
@Injectable()
export class GemPassService {
  private readonly logger = new Logger(GemPassService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Subscription.name)
    private readonly subModel: Model<SubscriptionDocument>,
    private readonly subscriptions: SubscriptionService,
    // 보석 기간권도 구독 행을 만든다. 결제 구독과 구분해서 남긴다
    private readonly subEvents: SubscriptionEventsService,
  ) {}

  /** 상점에 뿌릴 목록 + 지금 내가 살 수 있는지 */
  async list(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('gems')
      .lean();
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const gems = user.gems ?? 0;
    const { premiumUntil, stackedDays } = await this.currentStack(userId);

    return {
      gems,
      /** 지금 프리미엄이 언제까지인지 (없으면 null) */
      premiumUntil,
      /** 이미 쌓아둔 일수 */
      stackedDays,
      maxStackDays: GEM_PASS_MAX_STACK_DAYS,
      passes: GEM_PASSES.map((pass) => ({
        ...pass,
        /** 하루당 보석. 앱이 "n% 절약" 을 계산할 때 쓴다 */
        perDay: Math.round(pass.gems / pass.days),
        affordable: gems >= pass.gems,
        /** 상한을 넘겨서 못 사는 경우 */
        overStack: stackedDays + pass.days > GEM_PASS_MAX_STACK_DAYS,
      })),
    };
  }

  /**
   * 보석을 쓰고 프리미엄 기간을 받는다.
   *
   * 이미 프리미엄이면 **그 뒤에 붙인다** (지금부터가 아니라). 남은 기간을
   * 덮어쓰면 결제한 유저가 손해를 본다.
   */
  async redeem(userId: string, passId: string) {
    const pass = gemPassById(passId);
    if (!pass) throw new BadRequestException('UNKNOWN_GEM_PASS');

    const { premiumUntil, stackedDays } = await this.currentStack(userId);
    if (stackedDays + pass.days > GEM_PASS_MAX_STACK_DAYS) {
      throw new BadRequestException('GEM_PASS_STACK_LIMIT');
    }

    const uid = new Types.ObjectId(userId);
    // 보석 차감을 조건부·원자적으로. 조건을 걸지 않으면 요청이 겹쳤을 때
    // 잔액이 음수가 되거나 한 번 값으로 두 번 살 수 있다.
    const charged = await this.userModel
      .findOneAndUpdate(
        { _id: uid, gems: { $gte: pass.gems } },
        { $inc: { gems: -pass.gems } },
        { returnDocument: 'after' },
      )
      .select('gems')
      .lean();
    if (!charged) throw new BadRequestException('NOT_ENOUGH_GEMS');

    const now = new Date();
    // 남아 있는 프리미엄 뒤에 이어 붙인다
    const startedAt = premiumUntil && premiumUntil > now ? premiumUntil : now;
    const expiresAt = new Date(startedAt.getTime() + pass.days * DAY_MS);

    try {
      await this.subModel.create({
        userId: uid,
        provider: 'gems',
        platform: 'internal',
        tier: 'super',
        plan: 'gem_pass',
        productId: `gem_${pass.id}`,
        status: 'active',
        startedAt,
        expiresAt,
        autoRenew: false,
        // 같은 값이 두 번 들어올 수 없게 시각을 섞는다 (멱등 인덱스가 걸려 있다)
        externalTransactionId: `gems:${userId}:${now.getTime()}`,
      });
    } catch (error) {
      // 구독 행을 못 만들면 보석만 사라진다. 되돌린다.
      await this.userModel
        .updateOne({ _id: uid }, { $inc: { gems: pass.gems } })
        .catch(() => undefined);
      this.logger.error(
        `보석 기간권 실패로 환불: user=${userId} pass=${passId} ${String(error)}`,
      );
      throw new BadRequestException('GEM_PASS_FAILED');
    }

    await this.subEvents.record({
      userId,
      fromStatus: null,
      toStatus: 'active',
      provider: 'gems',
      plan: 'gem_pass',
      productId: `gem_${pass.id}`,
      reason: 'gem_pass',
    });

    // 기존 투영 경로를 그대로 쓴다 → user.isSuper / superExpiresAt 갱신
    await this.subscriptions.syncUser(userId);

    this.logger.log(
      `보석 기간권: user=${userId} ${pass.days}일 -${pass.gems}보석 ` +
        `→ ${expiresAt.toISOString()} (잔액 ${charged.gems})`,
    );

    return {
      passId: pass.id,
      days: pass.days,
      gemsSpent: pass.gems,
      gems: charged.gems ?? 0,
      premiumUntil: expiresAt,
    };
  }

  /** 지금 프리미엄이 언제까지인지 + 보석으로 쌓아둔 일수 */
  private async currentStack(userId: string) {
    const now = new Date();
    const active = await this.subModel
      .find({
        userId: new Types.ObjectId(userId),
        status: { $in: ENTITLED_STATUSES },
        expiresAt: { $gt: now },
      })
      .sort({ expiresAt: -1 })
      .limit(1)
      .lean();

    const premiumUntil = active[0]?.expiresAt ?? null;
    // 상한은 "보석으로 산 것" 이 아니라 남은 전체 기간으로 본다.
    // 결제 구독이 1년 남았는데 보석으로 60일을 더 쌓는 건 의미가 없다.
    const stackedDays = premiumUntil
      ? Math.max(
          0,
          Math.ceil((premiumUntil.getTime() - now.getTime()) / DAY_MS),
        )
      : 0;
    return { premiumUntil, stackedDays };
  }
}
