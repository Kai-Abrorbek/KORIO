import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { ENERGY_CONFIG } from './energy.constants';
import { computeEnergy, minutesToFull } from './energy.util';
import { isSuperActive } from '../users/super.util';

@Injectable()
export class EnergyService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // 현재 에너지 상태 (회복 반영해서 저장까지)
  async getState(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    const superActive = isSuperActive(user);
    const now = new Date();
    const res = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      superActive,
      now,
    );

    // 회복분 반영 저장 (변화 있을 때만)
    if (
      res.energy !== user.energy ||
      res.energyUpdatedAt.getTime() !== new Date(user.energyUpdatedAt).getTime()
    ) {
      user.energy = res.energy;
      user.energyUpdatedAt = res.energyUpdatedAt;
      await user.save();
    }

    return this.buildResponse(user, res.secondsToNext);
  }

  // 충전하기: gems 차감 후 MAX로
  async refill(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    if (user.gems < ENERGY_CONFIG.REFILL_GEM_COST) {
      throw new BadRequestException('보석이 부족합니다');
    }

    user.gems -= ENERGY_CONFIG.REFILL_GEM_COST;
    user.energy = ENERGY_CONFIG.MAX;
    user.energyUpdatedAt = new Date();
    await user.save();

    return this.buildResponse(user, 0);
  }

  // 무료 +5 (하루 3회)
  async claimFree(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    // 먼저 회복 반영
    const superActive = isSuperActive(user);
    const now = new Date();
    const regen = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      superActive,
      now,
    );
    user.energy = regen.energy;
    user.energyUpdatedAt = regen.energyUpdatedAt;

    // 오늘 받은 횟수 계산
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const claims = (user.freeEnergyClaims ?? []).filter(
      (d) => new Date(d) >= todayStart,
    );

    if (claims.length >= ENERGY_CONFIG.FREE_DAILY_LIMIT) {
      throw new BadRequestException('오늘 무료 충전을 모두 사용했어요');
    }

    user.energy = Math.min(
      ENERGY_CONFIG.MAX,
      user.energy + ENERGY_CONFIG.FREE_AMOUNT,
    );
    user.freeEnergyClaims = [...claims, now]; // 오늘 것만 유지 (과거 정리)
    await user.save();

    const res = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      superActive,
      now,
    );
    return this.buildResponse(user, res.secondsToNext);
  }

  // 레슨에서 에너지 1 소모 (회복 반영 후 차감)
  async consume(userId: string, amount = 1) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');

    const superActive = isSuperActive(user);
    const now = new Date();
    const regen = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      superActive,
      now,
    );
    user.energy = regen.energy;
    user.energyUpdatedAt = regen.energyUpdatedAt;

    if (!superActive) {
      user.energy = Math.max(0, user.energy - amount);
    }
    await user.save();

    const res = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      superActive,
      now,
    );
    return this.buildResponse(user, res.secondsToNext);
  }

  private buildResponse(user: User, secondsToNext: number) {
    const superActive = isSuperActive(user);
    const totalMin = minutesToFull(user.energy, secondsToNext, superActive);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const freeUsedToday = (user.freeEnergyClaims ?? []).filter(
      (d) => new Date(d) >= todayStart,
    ).length;

    return {
      energy: user.energy,
      maxEnergy: ENERGY_CONFIG.MAX,
      gems: user.gems,
      isSuper: superActive,
      secondsToNext, // 다음 1개까지 남은 초
      minutesToFull: totalMin, // 꽉 찰 때까지 분
      etaHours: Math.floor(totalMin / 60),
      etaMinutes: totalMin % 60,
      refillCost: ENERGY_CONFIG.REFILL_GEM_COST,
      freeRemaining: Math.max(
        0,
        ENERGY_CONFIG.FREE_DAILY_LIMIT - freeUsedToday,
      ),
    };
  }
}
