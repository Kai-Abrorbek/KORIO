import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  ENERGY_CONFIG,
  COMBO_BONUS_DAILY_LIMIT,
  COMBO_BONUS_THRESHOLD,
} from './energy.constants';
import {
  claimsSince,
  computeEnergy,
  decideComboBonus,
  minutesToFull,
} from './energy.util';
import { isSuperActive } from '../users/super.util';
import { startOfDay } from '../common/date.util';

@Injectable()
export class EnergyService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // ─────────────────────────── 조회 ───────────────────────────

  /** 현재 상태. 흐른 시간만큼 회복시켜서 저장까지 한다 */
  async getState(userId: string) {
    const user = await this.mustFind(userId);
    await this.applyRegen(user);
    return this.buildResponse(user);
  }

  // ─────────────────────────── 충전 ───────────────────────────

  /**
   * 보석으로 가득 채우기.
   *
   * 조건 검사와 차감을 한 번의 findOneAndUpdate 로 묶는다. 따로 읽고 쓰면
   * 요청 두 개가 겹칠 때 둘 다 "보석 충분" 을 보고 통과해서, 350 짜리를
   * 두 번 사고 보석이 음수로 내려간다.
   */
  async refill(userId: string) {
    const uid = new Types.ObjectId(userId);
    const updated = await this.userModel.findOneAndUpdate(
      { _id: uid, gems: { $gte: ENERGY_CONFIG.REFILL_GEM_COST } },
      {
        $inc: { gems: -ENERGY_CONFIG.REFILL_GEM_COST },
        $set: { energy: ENERGY_CONFIG.MAX, energyUpdatedAt: new Date() },
      },
      { returnDocument: 'after' },
    );

    if (!updated) {
      // 유저가 없는 것과 보석이 모자란 것을 구분해서 알려준다
      const exists = await this.userModel.exists({ _id: uid });
      if (!exists) throw new NotFoundException('USER_NOT_FOUND');
      throw new BadRequestException('NOT_ENOUGH_GEMS');
    }
    return this.buildResponse(updated);
  }

  /**
   * 무료 +5 (하루 3회).
   *
   * 횟수 검사도 조건절로 넣는다. 버튼을 빠르게 두 번 누르면 예전엔 둘 다
   * 통과했다.
   */
  async claimFree(userId: string) {
    const user = await this.mustFind(userId);
    // 회복분을 먼저 확정해야 아래 파이프라인의 $energy 가 최신값이 된다
    await this.applyRegen(user);

    const now = new Date();
    const todayStart = startOfDay(now, user.timezone);
    const todayOnly = {
      $filter: {
        input: { $ifNull: ['$freeEnergyClaims', []] },
        cond: { $gte: ['$$this', todayStart] },
      },
    };

    const updated = await this.userModel.findOneAndUpdate(
      {
        _id: user._id,
        $expr: {
          $lt: [{ $size: todayOnly }, ENERGY_CONFIG.FREE_DAILY_LIMIT],
        },
      },
      [
        {
          $set: {
            energy: {
              $min: [
                ENERGY_CONFIG.MAX,
                { $add: ['$energy', ENERGY_CONFIG.FREE_AMOUNT] },
              ],
            },
            // 지난 날짜 기록은 여기서 같이 버린다 — 배열이 무한정 자라지 않게
            freeEnergyClaims: { $concatArrays: [todayOnly, [now]] },
          },
        },
      ],
      { returnDocument: 'after' },
    );

    if (!updated) throw new BadRequestException('FREE_LIMIT_REACHED');
    return this.buildResponse(updated);
  }

  // ─────────────────────────── 소모 ───────────────────────────

  /** 문제 하나 풀 때마다 1 소모. 슈퍼는 안 깎는다 */
  async consume(userId: string, amount = 1) {
    const user = await this.mustFind(userId);
    const superActive = isSuperActive(user);

    await this.applyRegen(user);
    if (superActive) return this.buildResponse(user);

    user.energy = Math.max(0, user.energy - amount);
    await user.save();
    return this.buildResponse(user);
  }

  // ─────────────────────────── 콤보 보너스 ───────────────────────────

  /**
   * 4연속 정답 보너스.
   *
   * ⚠️ "정말 4연속 맞혔는지" 는 서버가 모른다 — 채점이 앱에 있다. 그래서
   *    규칙(간격·횟수·에너지 상한)은 전부 서버가 들고 있고, 앱이 언제
   *    부르든 여기서 정해진 만큼만 나간다. 예전엔 앱 말을 그대로 믿어서,
   *    이 엔드포인트를 반복 호출하는 것만으로 에너지를 계속 채울 수 있었다.
   */
  async grantComboBonus(userId: string) {
    const user = await this.mustFind(userId);
    await this.applyRegen(user);

    const now = new Date();
    const todayStart = startOfDay(now, user.timezone);
    const decision = decideComboBonus({
      energy: user.energy,
      isSuper: isSuperActive(user),
      claimsToday: claimsSince(user.comboBonusClaims, todayStart),
      now,
    });

    // 못 주는 건 에러가 아니다. 앱은 그냥 연출을 안 하면 된다
    if (!decision.granted) return this.buildResponse(user, 0);

    const todayOnly = {
      $filter: {
        input: { $ifNull: ['$comboBonusClaims', []] },
        cond: { $gte: ['$$this', todayStart] },
      },
    };

    const updated = await this.userModel.findOneAndUpdate(
      {
        _id: user._id,
        // 조건을 여기 한 번 더 건다. 요청이 겹쳐 들어와도 한도를 못 넘는다
        energy: { $lte: COMBO_BONUS_THRESHOLD },
        $expr: {
          $lt: [{ $size: todayOnly }, COMBO_BONUS_DAILY_LIMIT],
        },
      },
      [
        {
          $set: {
            energy: {
              $min: [ENERGY_CONFIG.MAX, { $add: ['$energy', decision.granted] }],
            },
            comboBonusClaims: { $concatArrays: [todayOnly, [now]] },
          },
        },
      ],
      { returnDocument: 'after' },
    );

    // 조건이 어긋났으면(겹친 요청이 먼저 먹었다) 지급 없이 현재 상태만
    if (!updated) return this.buildResponse(user, 0);
    return this.buildResponse(updated, decision.granted);
  }

  // ─────────────────────────── 내부 ───────────────────────────

  private async mustFind(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    return user;
  }

  /**
   * 흐른 시간만큼 회복시키고, **바뀐 게 있을 때만** 저장한다.
   *
   * 예전엔 꽉 찬 유저도 호출할 때마다 energyUpdatedAt 이 now 로 바뀌어서
   * 매번 쓰기가 일어났다. 슈퍼 유저는 문제를 풀 때마다 쓸데없이 DB 를 썼다.
   */
  private async applyRegen(user: UserDocument): Promise<void> {
    const res = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      isSuperActive(user),
    );
    const sameEnergy = res.energy === user.energy;
    const sameStamp =
      res.energyUpdatedAt.getTime() ===
      new Date(user.energyUpdatedAt).getTime();
    if (sameEnergy && (sameStamp || res.isFull)) return;

    user.energy = res.energy;
    user.energyUpdatedAt = res.energyUpdatedAt;
    await user.save();
  }

  /**
   * 응답 한 벌.
   *
   * secondsToNext 를 인자로 받지 않고 여기서 직접 계산한다 — 부르는 쪽이
   * 0 을 넘겨서 "곧 찹니다" 로 잘못 표시되던 자리가 있었다.
   */
  private buildResponse(user: User, bonusGranted = 0) {
    const superActive = isSuperActive(user);
    const { secondsToNext } = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      superActive,
    );
    const totalMin = minutesToFull(user.energy, secondsToNext, superActive);
    const todayStart = startOfDay(new Date(), user.timezone);
    const freeUsedToday = claimsSince(user.freeEnergyClaims, todayStart).length;

    return {
      energy: user.energy,
      bonusGranted,
      maxEnergy: ENERGY_CONFIG.MAX,
      gems: user.gems,
      isSuper: superActive,
      secondsToNext,
      minutesToFull: totalMin,
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
