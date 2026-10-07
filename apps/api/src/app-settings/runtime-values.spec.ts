import { ENERGY_CONFIG } from '../energy/energy.constants';
import { computeEnergy } from '../energy/energy.util';
import {
  DAILY_QUESTS,
  STREAK_FREEZE,
  STREAK_GOALS,
} from '../retention/retention.config';
import {
  GEM_PASSES,
  GEM_PASS_MAX_STACK_DAYS,
} from '../payments/gems/gem-pass.const';
import {
  REFERRAL_GEMS,
  REFERRAL_MILESTONES,
} from '../referral/referral.constants';
import { putRuntimeValue, replaceRuntimeValues } from './runtime-values';

describe('runtime settings used by existing economy paths', () => {
  afterEach(() => replaceRuntimeValues(new Map()));

  it('changes the energy cap and recomputes regeneration time without a restart', () => {
    expect(ENERGY_CONFIG.MAX).toBe(50);
    expect(ENERGY_CONFIG.REGEN_MINUTES).toBe(28.8);
    putRuntimeValue('ENERGY_CONFIG.MAX', 100);
    expect(ENERGY_CONFIG.MAX).toBe(100);
    expect(ENERGY_CONFIG.REGEN_MINUTES).toBe(14.4);
    expect(
      computeEnergy({ energy: 1, energyUpdatedAt: new Date(0) }, true).energy,
    ).toBe(100);
  });

  it('updates nested quest rewards and pass prices through existing exported objects', () => {
    putRuntimeValue('DAILY_QUESTS.REWARD.easy', 45);
    putRuntimeValue('GEM_PASSES.0.gems', 6000);
    putRuntimeValue('STREAK_FREEZE.MAX_HOLD', 3);
    expect(DAILY_QUESTS.REWARD.easy).toBe(45);
    expect(GEM_PASSES[0]?.gems).toBe(6000);
    expect(STREAK_FREEZE.MAX_HOLD).toBe(3);
  });

  it('updates primitive live bindings and referral milestone rewards', () => {
    putRuntimeValue('REFERRAL_GEMS', 1200);
    putRuntimeValue('GEM_PASS_MAX_STACK_DAYS', 90);
    putRuntimeValue('REFERRAL_MILESTONES.0.gems', 1500);
    expect(REFERRAL_GEMS).toBe(1200);
    expect(GEM_PASS_MAX_STACK_DAYS).toBe(90);
    expect(REFERRAL_MILESTONES[0]?.gems).toBe(1500);
  });

  it('preserves object identity for existing array operations', () => {
    const goal = STREAK_GOALS.find((item) => item.days === 7);
    expect(STREAK_GOALS.indexOf(goal!)).toBe(1);
  });
});
