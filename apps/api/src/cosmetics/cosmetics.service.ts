import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GemLedgerService } from '../gem-ledger/gem-ledger.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  AURA_NONE,
  COSMETICS,
  cosmeticById,
  isFreeCosmetic,
  ownedWithFree,
} from './cosmetics.const';

/** 장착하려는 오라를 갖고 있는지 — avatar 저장(updateAvatar)도 이걸 쓴다 */
export function assertAuraOwned(
  aura: string | null | undefined,
  owned: readonly string[] | null | undefined,
) {
  if (!aura || aura === AURA_NONE || isFreeCosmetic(aura)) return;
  if (!(owned ?? []).includes(aura))
    throw new ForbiddenException('COSMETIC_NOT_OWNED');
}

/**
 * 꾸미기 아이템 — 보석으로 사고, 산 건 영원히 내 것. 장착은 avatar.aura.
 *
 * 보석 차감과 "가진 목록" 추가를 한 번의 조건부 업데이트로 한다:
 * 잔액이 모자라거나 이미 가진 아이템이면 아무것도 안 바뀐다 (두 번 눌러도 한 번).
 */
@Injectable()
export class CosmeticsService {
  private readonly logger = new Logger(CosmeticsService.name);

  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @Optional() private readonly gemLedger?: GemLedgerService,
  ) {}

  async list(userId: string) {
    const user = await this.users
      .findById(new Types.ObjectId(userId))
      .select('gems ownedCosmetics avatar.aura')
      .lean();
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    return {
      gems: user.gems ?? 0,
      owned: ownedWithFree(user.ownedCosmetics),
      equipped: { aura: user.avatar?.aura ?? AURA_NONE },
      items: COSMETICS.map((item) => ({
        id: item.id,
        slot: item.slot,
        rarity: item.rarity,
        price: item.price,
      })),
    };
  }

  async purchase(userId: string, itemId: string, equip = false) {
    const item = cosmeticById(itemId);
    if (!item) throw new BadRequestException('UNKNOWN_COSMETIC');
    const uid = new Types.ObjectId(userId);
    const price = item.price;

    // 무료 — 보석 없이 내 것으로 넣고(나중에 다시 팔아도 유지) 바로 입힌다
    if (price <= 0) {
      const claimed = await this.users
        .findOneAndUpdate(
          { _id: uid },
          {
            $addToSet: { ownedCosmetics: item.id },
            ...(equip ? { $set: { 'avatar.aura': item.id } } : {}),
          },
          { returnDocument: 'after' },
        )
        .select('gems ownedCosmetics avatar')
        .lean();
      if (!claimed) throw new NotFoundException('USER_NOT_FOUND');
      return {
        itemId: item.id,
        gems: claimed.gems ?? 0,
        owned: ownedWithFree(claimed.ownedCosmetics),
        avatar: claimed.avatar,
      };
    }

    const bought = await this.users
      .findOneAndUpdate(
        { _id: uid, gems: { $gte: price }, ownedCosmetics: { $ne: item.id } },
        {
          $inc: { gems: -price },
          $addToSet: { ownedCosmetics: item.id },
          ...(equip ? { $set: { 'avatar.aura': item.id } } : {}),
        },
        { returnDocument: 'after' },
      )
      .select('gems ownedCosmetics avatar')
      .lean();

    if (!bought) {
      const user = await this.users
        .findById(uid)
        .select('gems ownedCosmetics')
        .lean();
      if (!user) throw new NotFoundException('USER_NOT_FOUND');
      if ((user.ownedCosmetics ?? []).includes(item.id))
        throw new ConflictException('COSMETIC_ALREADY_OWNED');
      throw new BadRequestException('NOT_ENOUGH_GEMS');
    }

    await this.gemLedger?.record(uid, -price, 'cosmetic', { item: item.id });
    this.logger.log(
      `꾸미기 구매: user=${userId} ${item.id} -${price}보석 (잔액 ${bought.gems})`,
    );
    return {
      itemId: item.id,
      gems: bought.gems ?? 0,
      owned: bought.ownedCosmetics ?? [],
      avatar: bought.avatar,
    };
  }
}
