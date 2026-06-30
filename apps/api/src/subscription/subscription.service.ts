import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

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

    const active =
      !!user.isSuper &&
      (!user.superExpiresAt || new Date(user.superExpiresAt) > new Date());
    return {
      isSuper: active,
      plan: (user as any).superPlan ?? null,
      expiresAt: (user as any).superExpiresAt ?? null,
    };
  }

  async subscribe(userId: string, planId: string) {
    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) throw new BadRequestException('Invalid plan');

    // 결제 검증은 추후 (스토어 영수증). 지금은 구독 활성화 + 보석 지급
    const expires = new Date();
    expires.setMonth(expires.getMonth() + plan.durationMonths);

    await this.userModel.findByIdAndUpdate(userId, {
      isSuper: true,
      superPlan: plan.id,
      superExpiresAt: expires,
      $inc: { gems: MONTHLY_GEM_GRANT },
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
