import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { isSuperActive, trialDaysLeft } from '../users/super.util';

export interface PlanFeature {
  icon: string;
  key: string;
}

export interface Plan {
  id: string;
  name: string;
  durationMonths: number;
  priceUsd: number;
  pricePerMonthUsd: number;
  discountPercent?: number;
  popular?: boolean;
  trialDays?: number;
}

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'monthly',
    durationMonths: 1,
    priceUsd: 9.99,
    pricePerMonthUsd: 9.99,
    trialDays: 7,
  },
  {
    id: 'yearly',
    name: 'yearly',
    durationMonths: 12,
    priceUsd: 59.99,
    pricePerMonthUsd: 5.0,
    discountPercent: 50,
    popular: true,
    trialDays: 14,
  },
  {
    id: 'family',
    name: 'family',
    durationMonths: 12,
    priceUsd: 99.99,
    pricePerMonthUsd: 8.33,
    discountPercent: 30,
  },
];

// 혜택 목록 (프론트에서 i18n 처리)
const FEATURES: PlanFeature[] = [
  { icon: 'infinite', key: 'unlimitedEnergy' },
  { icon: 'close-circle', key: 'noAds' },
  { icon: 'refresh', key: 'unlimitedReview' },
  { icon: 'sparkles', key: 'aiTutor' },
  { icon: 'diamond', key: 'monthlyGems' },
  { icon: 'stats-chart', key: 'advancedStats' },
];

const MONTHLY_GEM_GRANT = 500;

@Injectable()
export class SubscriptionService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getPlans() {
    return { plans: PLANS, features: FEATURES };
  }

  async getMySubscription(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('isSuper superExpiresAt superPlan')
      .lean();
    if (!user) throw new NotFoundException('User not found');

    const active = isSuperActive(user as any);
    const daysLeft = trialDaysLeft(user as any);

    return {
      isSuper: active,
      plan: (user as any).superPlan ?? null,
      expiresAt: (user as any).superExpiresAt ?? null,
      isTrial: (user as any).superPlan === 'trial' && active,
      trialDaysLeft: daysLeft,
    };
  }

  /**
   * ⚠️ 아직 스토어 영수증 검증이 없다.
   *
   * 검증 없이 열어두면 로그인한 사람이 이 엔드포인트를 직접 호출해서
   * 1년 구독 + 보석 500 을 공짜로 가져가고, 호출할 때마다 보석이 또 쌓인다.
   * react-native-iap 붙이기 전까지는 프로덕션에서 아예 막는다.
   * 개발/시연용으로 열려면 ALLOW_UNVERIFIED_SUBSCRIBE=true.
   */
  async subscribe(userId: string, planId: string) {
    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) throw new BadRequestException('Invalid plan');

    if (process.env.ALLOW_UNVERIFIED_SUBSCRIBE !== 'true') {
      throw new ForbiddenException('PURCHASE_VERIFICATION_REQUIRED');
    }

    const user = await this.userModel
      .findById(userId)
      .select('isSuper superExpiresAt')
      .lean();
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');

    const expires = new Date();
    expires.setMonth(expires.getMonth() + plan.durationMonths);

    // 보석은 "새로 구독을 시작할 때" 한 번만. 재호출로 계속 불어나면 안 된다.
    const alreadySuper = isSuperActive(user as any);

    await this.userModel.findByIdAndUpdate(userId, {
      $set: {
        isSuper: true,
        superPlan: plan.id,
        superExpiresAt: expires,
      },
      ...(alreadySuper ? {} : { $inc: { gems: MONTHLY_GEM_GRANT } }),
    });

    return { success: true, plan: plan.id, expiresAt: expires };
  }

  async cancel(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      isSuper: false,
      superPlan: null,
      superExpiresAt: null,
    });
    return { success: true };
  }
}
