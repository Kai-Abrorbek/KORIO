import type { Model } from 'mongoose';
jest.mock('../lessons/schemas/question.schema', () => ({
  QuestionType: new Proxy({}, { get: (_, key: string) => key.toLowerCase() }),
}));
jest.mock('../admin/admin-audit.service', () => ({
  AdminAuditService: class AdminAuditService {},
}));

import type { AdminAuditService } from '../admin/admin-audit.service';
import { ENERGY_CONFIG } from '../energy/energy.constants';
import type { AppSettingDocument } from './app-setting.schema';
import { AppSettingsService } from './app-settings.service';
import { SETTING_CATALOG } from './setting-catalog';
import { replaceRuntimeValues } from './runtime-values';

describe('AppSettingsService', () => {
  const admin = {
    userId: '507f1f77bcf86cd799439011',
    email: 'admin@example.test',
    role: 'super_admin' as const,
  };
  const db = { findOneAndUpdate: jest.fn().mockResolvedValue({}) };
  const audit = { record: jest.fn().mockResolvedValue(undefined) };
  const service = new AppSettingsService(
    db as unknown as Model<AppSettingDocument>,
    audit as unknown as AdminAuditService,
  );

  beforeEach(() => {
    replaceRuntimeValues(new Map());
    jest.clearAllMocks();
  });

  it('has unique, bounded settings', () => {
    expect(new Set(SETTING_CATALOG.map((item) => item.key)).size).toBe(
      SETTING_CATALOG.length,
    );
    expect(
      SETTING_CATALOG.every(
        (item) =>
          Number.isFinite(item.defaultValue) &&
          item.defaultValue >= item.min &&
          item.defaultValue <= item.max,
      ),
    ).toBe(true);
  });

  it('persists and immediately applies a valid value', async () => {
    await service.update(
      'ENERGY_CONFIG.FREE_AMOUNT',
      20,
      '운영 테스트 변경',
      admin,
    );
    expect(db.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(ENERGY_CONFIG.FREE_AMOUNT).toBe(20);
    expect(
      service
        .list()
        .items.find((item) => item.key === 'ENERGY_CONFIG.FREE_AMOUNT')?.value,
    ).toBe(20);
    expect(audit.record).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'settings.update' }),
    );
  });

  it('rejects invalid or contradictory settings before DB writes', async () => {
    await expect(
      service.update('ENERGY_CONFIG.FREE_AMOUNT', 500, '범위 밖 변경', admin),
    ).rejects.toThrow('INVALID_APP_SETTING');
    await expect(
      service.update('ENERGY_CONFIG.FREE_AMOUNT', 60, '최대치 초과', admin),
    ).rejects.toThrow('APP_SETTING_CONFLICT');
    await expect(
      service.update('GEM_PASSES.0.gems', 20000, '가격 역전 금지', admin),
    ).rejects.toThrow('GEM_PASS_PRICE_ORDER');
    expect(db.findOneAndUpdate).not.toHaveBeenCalled();
  });
});
