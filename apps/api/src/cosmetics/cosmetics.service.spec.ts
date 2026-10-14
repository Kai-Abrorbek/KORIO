import { Types } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../gem-ledger/gem-ledger.service', () => ({
  GemLedgerService: class GemLedgerService {},
}));

import { replaceRuntimeValues } from '../app-settings/runtime-values';
import { assertAuraOwned, CosmeticsService } from './cosmetics.service';

/** 지금은 전부 무료(0)다. 파는 경로는 어드민이 가격을 올린 것처럼 값을 넣고 본다 */
const SALE = new Map([
  ['COSMETICS.0.price', 800],
  ['COSMETICS.1.price', 800],
  ['COSMETICS.2.price', 2000],
  ['COSMETICS.3.price', 5000],
  ['COSMETICS.4.price', 12000],
]);
afterEach(() => replaceRuntimeValues(new Map()));

const chain = (value: unknown) => {
  const node = { select: () => node, lean: () => Promise.resolve(value) };
  return node;
};

describe('CosmeticsService', () => {
  const userId = new Types.ObjectId().toString();
  let users: { findById: jest.Mock; findOneAndUpdate: jest.Mock };
  let ledger: { record: jest.Mock };
  let service: CosmeticsService;

  beforeEach(() => {
    replaceRuntimeValues(SALE);
    users = { findById: jest.fn(), findOneAndUpdate: jest.fn() };
    ledger = { record: jest.fn().mockResolvedValue(undefined) };
    service = new CosmeticsService(users as never, ledger as never);
  });

  it('charges gems once, adds the item and can equip it right away', async () => {
    users.findOneAndUpdate.mockReturnValue(
      chain({
        gems: 1200,
        ownedCosmetics: ['aura_blossom'],
        avatar: { aura: 'aura_blossom' },
      }),
    );
    const res = await service.purchase(userId, 'aura_blossom', true);
    const [filter, update] = users.findOneAndUpdate.mock.calls[0] as [
      Record<string, unknown>,
      Record<string, unknown>,
    ];
    expect(filter).toMatchObject({
      gems: { $gte: 2000 },
      ownedCosmetics: { $ne: 'aura_blossom' },
    });
    expect(update).toEqual({
      $inc: { gems: -2000 },
      $addToSet: { ownedCosmetics: 'aura_blossom' },
      $set: { 'avatar.aura': 'aura_blossom' },
    });
    expect(ledger.record).toHaveBeenCalledWith(
      expect.anything(),
      -2000,
      'cosmetic',
      { item: 'aura_blossom' },
    );
    expect(res).toMatchObject({ gems: 1200, owned: ['aura_blossom'] });
  });

  it('refuses when gems are short', async () => {
    users.findOneAndUpdate.mockReturnValue(chain(null));
    users.findById.mockReturnValue(chain({ gems: 100, ownedCosmetics: [] }));
    await expect(service.purchase(userId, 'aura_flame')).rejects.toThrow(
      'NOT_ENOUGH_GEMS',
    );
    expect(ledger.record).not.toHaveBeenCalled();
  });

  it('never charges twice for the same item', async () => {
    users.findOneAndUpdate.mockReturnValue(chain(null));
    users.findById.mockReturnValue(
      chain({ gems: 99999, ownedCosmetics: ['aura_flame'] }),
    );
    await expect(service.purchase(userId, 'aura_flame')).rejects.toThrow(
      'COSMETIC_ALREADY_OWNED',
    );
  });

  it('rejects unknown items', async () => {
    await expect(service.purchase(userId, 'aura_gold')).rejects.toThrow(
      'UNKNOWN_COSMETIC',
    );
    expect(users.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it('only lets you wear auras you own', () => {
    expect(() => assertAuraOwned('aura_none', [])).not.toThrow();
    expect(() => assertAuraOwned(undefined, [])).not.toThrow();
    expect(() => assertAuraOwned('aura_snow', ['aura_snow'])).not.toThrow();
    expect(() => assertAuraOwned('aura_hangul', ['aura_snow'])).toThrow(
      'COSMETIC_NOT_OWNED',
    );
  });
});

describe('CosmeticsService — 무료(가격 0)', () => {
  const userId = new Types.ObjectId().toString();

  it('무료 오라는 모두가 가진 것 — 목록에 owned 로, 입어도 막지 않는다', async () => {
    const users = {
      findById: jest.fn().mockReturnValue(
        chain({
          gems: 10,
          ownedCosmetics: [],
          avatar: { aura: 'aura_none' },
        }),
      ),
    };
    const service = new CosmeticsService(users as never, undefined);
    const res = await service.list(userId);
    expect(res.owned).toEqual(
      expect.arrayContaining(['aura_stardust', 'aura_hangul']),
    );
    expect(res.items.every((item) => item.price === 0)).toBe(true);
    expect(() => assertAuraOwned('aura_hangul', [])).not.toThrow();
  });

  it('무료 "구매" 는 보석을 안 빼고 내 것으로 넣어 둔다 (장부도 안 쓴다)', async () => {
    const users = {
      findOneAndUpdate: jest.fn().mockReturnValue(
        chain({
          gems: 10,
          ownedCosmetics: ['aura_flame'],
          avatar: { aura: 'aura_flame' },
        }),
      ),
    };
    const ledger = { record: jest.fn() };
    const service = new CosmeticsService(users as never, ledger as never);
    const res = await service.purchase(userId, 'aura_flame', true);
    const [filter, update] = users.findOneAndUpdate.mock.calls[0] as [
      Record<string, unknown>,
      Record<string, unknown>,
    ];
    expect(filter).not.toHaveProperty('gems');
    expect(update).toEqual({
      $addToSet: { ownedCosmetics: 'aura_flame' },
      $set: { 'avatar.aura': 'aura_flame' },
    });
    expect(ledger.record).not.toHaveBeenCalled();
    expect(res).toMatchObject({ gems: 10 });
  });

  it('다시 팔게 되면 받아 둔 건 그대로, 안 받은 건 막는다', () => {
    replaceRuntimeValues(SALE);
    expect(() => assertAuraOwned('aura_flame', ['aura_flame'])).not.toThrow();
    expect(() => assertAuraOwned('aura_hangul', ['aura_flame'])).toThrow(
      'COSMETIC_NOT_OWNED',
    );
  });
});
