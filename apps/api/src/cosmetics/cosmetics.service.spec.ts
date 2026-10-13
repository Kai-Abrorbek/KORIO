import { Types } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../gem-ledger/gem-ledger.service', () => ({
  GemLedgerService: class GemLedgerService {},
}));

import { assertAuraOwned, CosmeticsService } from './cosmetics.service';

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
