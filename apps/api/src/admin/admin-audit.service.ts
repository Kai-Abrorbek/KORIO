import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AdminAuditLog,
  AdminAuditLogDocument,
} from './schemas/admin-audit-log.schema';
import type { AdminRequestContext } from './guards/admin.guard';

/**
 * 어드민이 한 일을 남긴다.
 *
 * ⚠️ 다른 계측 서비스와 달리 **이건 실패를 삼키되 크게 로그를 남긴다.**
 *    분석 데이터는 좀 빠져도 되지만 감사 로그가 빠지는 건 다른 문제다.
 *    그렇다고 기록 실패로 운영 행동을 막으면 사고 대응 중에 손발이 묶인다.
 *    그래서 막지는 않고, 대신 error 레벨로 남겨 눈에 띄게 한다.
 */
@Injectable()
export class AdminAuditService {
  private readonly logger = new Logger(AdminAuditService.name);

  constructor(
    @InjectModel(AdminAuditLog.name)
    private readonly model: Model<AdminAuditLogDocument>,
  ) {}

  async record(params: {
    admin: AdminRequestContext;
    action: string;
    targetType?: string;
    targetId?: string;
    targetLabel?: string;
    changes?: Record<string, { from: unknown; to: unknown }>;
    reason?: string;
    ip?: string;
    userAgent?: string;
    success?: boolean;
    errorCode?: string;
  }): Promise<void> {
    try {
      await this.model.create({
        adminId: new Types.ObjectId(params.admin.userId),
        adminEmail: params.admin.email,
        adminRole: params.admin.role,
        action: params.action,
        targetType: params.targetType ?? '',
        targetId: params.targetId ?? '',
        targetLabel: (params.targetLabel ?? '').slice(0, 200),
        changes: params.changes ?? {},
        reason: (params.reason ?? '').slice(0, 500),
        ip: (params.ip ?? '').slice(0, 64),
        userAgent: (params.userAgent ?? '').slice(0, 300),
        success: params.success ?? true,
        errorCode: params.errorCode ?? '',
        at: new Date(),
      });
    } catch (e) {
      this.logger.error(
        `감사 로그 기록 실패 — ${params.admin.email} / ${params.action}: ${String(e)}`,
      );
    }
  }

  /**
   * 바뀐 필드만 뽑는다.
   *
   * 문서 전체를 두 벌 저장하면 로그가 본 데이터보다 커진다. 그리고 무엇이
   * 바뀌었는지 사람이 읽을 수 있어야 하는데, 전체 스냅샷은 읽을 수 없다.
   */
  static diff(
    before: Record<string, unknown>,
    after: Record<string, unknown>,
    fields?: string[],
  ): Record<string, { from: unknown; to: unknown }> {
    const keys = fields ?? [
      ...new Set([...Object.keys(before ?? {}), ...Object.keys(after ?? {})]),
    ];
    const out: Record<string, { from: unknown; to: unknown }> = {};
    for (const k of keys) {
      const a = before?.[k];
      const b = after?.[k];
      if (JSON.stringify(a) === JSON.stringify(b)) continue;
      out[k] = { from: a, to: b };
    }
    return out;
  }
}
