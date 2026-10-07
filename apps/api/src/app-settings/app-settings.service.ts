import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminAuditService } from '../admin/admin-audit.service';
import type { AdminRequestContext } from '../admin/guards/admin.guard';
import { AppSetting, AppSettingDocument } from './app-setting.schema';
import { SETTING_CATALOG, settingByKey } from './setting-catalog';
import {
  putRuntimeValue,
  replaceRuntimeValues,
  runtimeNumber,
} from './runtime-values';

@Injectable()
export class AppSettingsService implements OnModuleInit {
  private readonly logger = new Logger(AppSettingsService.name);

  constructor(
    @InjectModel(AppSetting.name)
    private readonly settings: Model<AppSettingDocument>,
    private readonly audit: AdminAuditService,
  ) {}

  async onModuleInit() {
    await this.refresh();
  }

  /** 다른 API 인스턴스의 수정도 최대 5초 후 반영된다. 조회 실패 시 기존 값을 유지한다. */
  @Interval(5_000)
  async refresh() {
    try {
      const rows = await this.settings
        .find({ key: { $in: [...settingByKey.keys()] } })
        .select('key value')
        .lean();
      const next = new Map<string, number>();
      for (const row of rows) {
        const spec = settingByKey.get(row.key);
        if (spec && this.valid(spec.key, row.value))
          next.set(row.key, row.value);
        else this.logger.warn(`잘못된 앱 설정 무시: ${row.key}`);
      }
      replaceRuntimeValues(next);
    } catch (error) {
      this.logger.error(
        `앱 설정 갱신 실패 — 기존 스냅샷 유지: ${String(error)}`,
      );
    }
  }

  list() {
    return {
      refreshSeconds: 5,
      items: SETTING_CATALOG.map((spec) => ({
        ...spec,
        value: runtimeNumber(spec.key, spec.defaultValue),
        overridden:
          runtimeNumber(spec.key, spec.defaultValue) !== spec.defaultValue,
      })),
    };
  }

  async update(
    key: string,
    value: number,
    reasonInput: string,
    admin: AdminRequestContext,
  ) {
    const spec = settingByKey.get(key);
    if (!spec || !this.valid(key, value))
      throw new BadRequestException('INVALID_APP_SETTING');
    const reason = reasonInput?.trim() ?? '';
    if (reason.length < 5 || reason.length > 500)
      throw new BadRequestException('REASON_REQUIRED');
    this.validateCombination(key, value);
    const before = runtimeNumber(key, spec.defaultValue);
    await this.settings.findOneAndUpdate(
      { key },
      { $set: { value, updatedBy: new Types.ObjectId(admin.userId), reason } },
      { upsert: true, new: true, runValidators: true },
    );
    putRuntimeValue(key, value);
    await this.audit.record({
      admin,
      action: 'settings.update',
      targetType: 'app_setting',
      targetId: key,
      reason,
      changes: { value: { from: before, to: value } },
    });
    return { key, value, previous: before, refreshSeconds: 5 };
  }

  private valid(key: string, value: number): boolean {
    const spec = settingByKey.get(key);
    return (
      !!spec &&
      Number.isFinite(value) &&
      value >= spec.min &&
      value <= spec.max &&
      (!spec.integer || Number.isInteger(value))
    );
  }

  private validateCombination(key: string, value: number) {
    const get = (name: string) =>
      runtimeNumber(name, settingByKey.get(name)!.defaultValue);
    const after = (name: string) => (name === key ? value : get(name));
    if (
      after('ENERGY_CONFIG.FREE_AMOUNT') > after('ENERGY_CONFIG.MAX') ||
      after('ENERGY_EARN.SESSION_MAX') > after('ENERGY_EARN.DAILY_MAX') ||
      after('STREAK_FREEZE.SUPER_WEEKLY') > after('STREAK_FREEZE.MAX_HOLD') ||
      after('DAILY_QUESTS.REROLLS_FREE') >
        after('DAILY_QUESTS.REROLLS_SUPER') ||
      after('SINGLE_GRANT_XP_CAP') > after('DAILY_XP_CAP')
    ) {
      throw new BadRequestException('APP_SETTING_CONFLICT');
    }
    const prices = GEM_PASS_KEYS.map((name) => after(name));
    if (prices.some((price, index) => index > 0 && price <= prices[index - 1]))
      throw new BadRequestException('GEM_PASS_PRICE_ORDER');
    for (const [min, max] of [
      ['WOOD_MIN', 'WOOD_MAX'],
      ['SILVER_MIN', 'SILVER_MAX'],
      ['GOLD_MIN', 'GOLD_MAX'],
    ]) {
      if (after(`CHEST_REWARDS.${min}`) > after(`CHEST_REWARDS.${max}`))
        throw new BadRequestException('CHEST_REWARD_RANGE');
    }
  }
}

const GEM_PASS_KEYS = [0, 1, 2, 3].map((index) => `GEM_PASSES.${index}.gems`);
