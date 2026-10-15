import { Types } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../gem-ledger/gem-ledger.service', () => ({
  GemLedgerService: class GemLedgerService {},
}));

import { replaceRuntimeValues } from '../app-settings/runtime-values';
import {
  assertAuraOwned,
  assertCosmeticOwned,
  CosmeticsService,
} from './cosmetics.service';

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

describe('CosmeticsService — 장면(scene)', () => {
  const userId = new Types.ObjectId().toString();

  it('장면을 "사면" avatar.scene 에 입힌다 (무료면 보석 없이)', async () => {
    const users = {
      findOneAndUpdate: jest.fn().mockReturnValue(
        chain({
          gems: 5,
          ownedCosmetics: ['scene_namsan'],
          avatar: { scene: 'scene_namsan' },
        }),
      ),
    };
    const service = new CosmeticsService(users as never, undefined);
    await service.purchase(userId, 'scene_namsan', true);
    const [, update] = users.findOneAndUpdate.mock.calls[0] as [
      unknown,
      Record<string, unknown>,
    ];
    expect(update).toEqual({
      $addToSet: { ownedCosmetics: 'scene_namsan' },
      $set: { 'avatar.scene': 'scene_namsan' },
    });
  });

  it('목록은 장착한 장면도 돌려준다', async () => {
    const users = {
      findById: jest
        .fn()
        .mockReturnValue(
          chain({ gems: 1, ownedCosmetics: [], avatar: { aura: 'aura_snow' } }),
        ),
    };
    const service = new CosmeticsService(users as never, undefined);
    const res = await service.list(userId);
    expect(res.equipped).toEqual({
      aura: 'aura_snow',
      scene: 'scene_none',
      pet: 'pet_none',
      costume: 'costume_none',
      hand: 'hand_none',
      hat: 'hat_none',
      title: 'title_none',
    });
    expect(res.items.some((item) => item.slot === 'scene')).toBe(true);
  });

  it('장면을 팔게 되면 안 가진 건 못 입는다 (없음은 늘 통과)', () => {
    replaceRuntimeValues(new Map([['COSMETICS.10.price', 9000]]));
    expect(() => assertCosmeticOwned('scene_none', [])).not.toThrow();
    expect(() => assertCosmeticOwned('scene_snow', [])).not.toThrow();
    expect(() => assertCosmeticOwned('scene_gyeongbokgung', [])).toThrow(
      'COSMETIC_NOT_OWNED',
    );
  });
});

describe('CosmeticsService — 펫(pet)', () => {
  const userId = new Types.ObjectId().toString();

  it('펫을 "사면" avatar.pet 에 입힌다 (무료면 보석 없이)', async () => {
    const users = {
      findOneAndUpdate: jest.fn().mockReturnValue(
        chain({
          gems: 5,
          ownedCosmetics: ['pet_jindo'],
          avatar: { pet: 'pet_jindo' },
        }),
      ),
    };
    const service = new CosmeticsService(users as never, undefined);
    await service.purchase(userId, 'pet_jindo', true);
    const [, update] = users.findOneAndUpdate.mock.calls[0] as [
      unknown,
      Record<string, unknown>,
    ];
    expect(update).toEqual({
      $addToSet: { ownedCosmetics: 'pet_jindo' },
      $set: { 'avatar.pet': 'pet_jindo' },
    });
  });

  it('목록은 장착한 펫도 돌려준다', async () => {
    const users = {
      findById: jest.fn().mockReturnValue(
        chain({
          gems: 1,
          ownedCosmetics: [],
          avatar: { aura: 'aura_none', pet: 'pet_tiger' },
        }),
      ),
    };
    const service = new CosmeticsService(users as never, undefined);
    const res = await service.list(userId);
    expect(res.equipped.pet).toBe('pet_tiger');
    expect(res.items.filter((item) => item.slot === 'pet')).toHaveLength(4);
  });

  it('펫을 팔게 되면 안 가진 건 못 입는다 (없음은 늘 통과)', () => {
    // 펫은 COSMETICS 11~14 — 도깨비(14)만 유료로
    replaceRuntimeValues(new Map([['COSMETICS.14.price', 12000]]));
    expect(() => assertCosmeticOwned('pet_none', [])).not.toThrow();
    expect(() => assertCosmeticOwned('pet_jindo', [])).not.toThrow();
    expect(() => assertCosmeticOwned('pet_dokkaebi', [])).toThrow(
      'COSMETIC_NOT_OWNED',
    );
    expect(() =>
      assertCosmeticOwned('pet_dokkaebi', ['pet_dokkaebi']),
    ).not.toThrow();
  });
});

describe('CosmeticsService — 의상·손(costume·hand, K팝 세트)', () => {
  const userId = new Types.ObjectId().toString();

  it('의상은 avatar.costume, 응원봉은 avatar.hand 에 입힌다', async () => {
    const users = {
      findOneAndUpdate: jest
        .fn()
        .mockReturnValue(chain({ gems: 5, ownedCosmetics: [], avatar: {} })),
    };
    const service = new CosmeticsService(users as never, undefined);
    await service.purchase(userId, 'costume_stage', true);
    await service.purchase(userId, 'hand_lightstick', true);
    const updates = users.findOneAndUpdate.mock.calls.map(
      (call) => (call as [unknown, { $set?: Record<string, string> }])[1].$set,
    );
    expect(updates).toEqual([
      { 'avatar.costume': 'costume_stage' },
      { 'avatar.hand': 'hand_lightstick' },
    ]);
  });

  it('팔게 되면 안 가진 마이크는 못 든다 (없음은 늘 통과)', () => {
    // K팝 세트는 COSMETICS 15~17 — 마이크(17)만 유료로
    replaceRuntimeValues(new Map([['COSMETICS.17.price', 3000]]));
    expect(() => assertCosmeticOwned('hand_none', [])).not.toThrow();
    expect(() => assertCosmeticOwned('costume_none', [])).not.toThrow();
    expect(() => assertCosmeticOwned('hand_lightstick', [])).not.toThrow();
    expect(() => assertCosmeticOwned('hand_mic', [])).toThrow(
      'COSMETIC_NOT_OWNED',
    );
  });
});

describe('CosmeticsService — 한국 전통 세트(hat)', () => {
  const userId = new Types.ObjectId().toString();

  it('갓은 avatar.hat 에 씌운다', async () => {
    const users = {
      findOneAndUpdate: jest
        .fn()
        .mockReturnValue(chain({ gems: 5, ownedCosmetics: [], avatar: {} })),
    };
    const service = new CosmeticsService(users as never, undefined);
    await service.purchase(userId, 'hat_gat', true);
    const [, update] = users.findOneAndUpdate.mock.calls[0] as [
      unknown,
      Record<string, unknown>,
    ];
    expect(update).toEqual({
      $addToSet: { ownedCosmetics: 'hat_gat' },
      $set: { 'avatar.hat': 'hat_gat' },
    });
  });

  it('전통 세트는 COSMETICS 18~24 — 곤룡포를 팔면 안 가진 사람은 못 입는다', () => {
    replaceRuntimeValues(new Map([['COSMETICS.18.price', 15000]]));
    expect(() => assertCosmeticOwned('costume_gonryongpo', [])).toThrow(
      'COSMETIC_NOT_OWNED',
    );
    expect(() => assertCosmeticOwned('hat_none', [])).not.toThrow();
    expect(() => assertCosmeticOwned('hat_ikseongwan', [])).not.toThrow();
  });
});

describe('CosmeticsService — 칭호(title)', () => {
  const userId = new Types.ObjectId().toString();

  it('일반 칭호는 무료면 누구나 — 세트 칭호는 그 세트를 받아 둔 사람만', () => {
    expect(() => assertCosmeticOwned('title_dawn', [])).not.toThrow();
    expect(() => assertCosmeticOwned('title_king', [])).toThrow(
      'COSMETIC_NOT_OWNED',
    );
    expect(() =>
      assertCosmeticOwned('title_king', ['costume_gonryongpo']),
    ).toThrow('COSMETIC_NOT_OWNED');
    expect(() =>
      assertCosmeticOwned('title_king', [
        'costume_gonryongpo',
        'hat_ikseongwan',
      ]),
    ).not.toThrow();
    // K팝은 응원봉·마이크 중 하나면 된다
    expect(() =>
      assertCosmeticOwned('title_kpop_idol', ['costume_stage', 'hand_mic']),
    ).not.toThrow();
  });

  it('목록 owned 에는 조건 못 채운 세트 칭호가 없다', async () => {
    const users = {
      findById: jest
        .fn()
        .mockReturnValue(
          chain({ gems: 0, ownedCosmetics: ['costume_taekwondo'], avatar: {} }),
        ),
    };
    const service = new CosmeticsService(users as never, undefined);
    const res = await service.list(userId);
    expect(res.owned).toContain('title_taekwondo');
    expect(res.owned).toContain('title_dawn');
    expect(res.owned).not.toContain('title_king');
    const king = res.items.find((item) => item.id === 'title_king');
    expect(king?.requires).toEqual([
      ['costume_gonryongpo'],
      ['hat_ikseongwan'],
    ]);
  });

  it('세트를 안 받아 둔 채 세트 칭호를 사려 하면 SET_NOT_COMPLETE', async () => {
    const users = {
      findById: jest
        .fn()
        .mockReturnValue(chain({ ownedCosmetics: ['costume_seonbi'] })),
      findOneAndUpdate: jest.fn(),
    };
    const service = new CosmeticsService(users as never, undefined);
    await expect(
      service.purchase(userId, 'title_seonbi', true),
    ).rejects.toThrow('SET_NOT_COMPLETE');
    expect(users.findOneAndUpdate).not.toHaveBeenCalled();
  });
});
