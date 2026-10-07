import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  ADMIN_PERMISSIONS,
  ADMIN_ROLES,
  permissionsFor,
  type AdminRole,
} from './admin.const';
import { AdminAuditService } from './admin-audit.service';
import type { AdminRequestContext } from './guards/admin.guard';

const MANAGEABLE_ROLES = [
  'content_admin',
  'support',
  'analyst',
  'none',
] as const;
export type ManageableRole = (typeof MANAGEABLE_ROLES)[number];

@Injectable()
export class AdminManageService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    private readonly audit: AdminAuditService,
  ) {}

  async overview() {
    const accounts = await this.users
      .find({ adminRole: { $in: ADMIN_ROLES } })
      .select('email nickname adminRole adminLastLoginAt createdAt')
      .sort({ adminRole: 1, email: 1 })
      .lean();
    return {
      roles: ADMIN_ROLES.map((role) => ({
        role,
        permissions: permissionsFor(role),
      })),
      permissions: ADMIN_PERMISSIONS,
      accounts: accounts.map((account) => ({
        id: String(account._id),
        email: account.email,
        nickname: account.nickname ?? '',
        role: account.adminRole,
        lastLoginAt: account.adminLastLoginAt?.toISOString() ?? null,
        createdAt: account.createdAt?.toISOString() ?? null,
      })),
      policy:
        '최고 관리자 지정·해제 및 신규 관리자 부여는 서버 운영 스크립트로만 처리합니다. 이 화면은 기존 일반 관리자 역할 변경·회수만 지원합니다.',
    };
  }

  async changeRole(
    targetId: string,
    input: { role: string; password: string; reason: string },
    admin: AdminRequestContext,
    ip?: string,
    userAgent?: string,
  ) {
    if (!isValidObjectId(targetId))
      throw new BadRequestException('INVALID_ADMIN_ID');
    if (targetId === admin.userId)
      throw new ForbiddenException('CANNOT_CHANGE_OWN_ROLE');
    if (!MANAGEABLE_ROLES.includes(input.role as ManageableRole))
      throw new BadRequestException('INVALID_ADMIN_ROLE');
    const reason = input.reason?.trim();
    if (!reason || reason.length > 500)
      throw new BadRequestException('REASON_REQUIRED');

    const actor = await this.users
      .findById(admin.userId)
      .select('+adminPassword adminRole');
    if (
      actor?.adminRole !== 'super_admin' ||
      !actor.adminPassword ||
      !(await bcrypt.compare(input.password ?? '', actor.adminPassword))
    ) {
      await this.audit.record({
        admin,
        action: 'admin.role_change',
        targetType: 'admin',
        targetId,
        reason,
        ip,
        userAgent,
        success: false,
        errorCode: 'REAUTH_FAILED',
      });
      throw new ForbiddenException('REAUTH_FAILED');
    }

    const target = await this.users
      .findById(targetId)
      .select('email adminRole')
      .lean();
    if (!target || !ADMIN_ROLES.includes(target.adminRole as AdminRole))
      throw new NotFoundException('ADMIN_NOT_FOUND');
    if (target.adminRole === 'super_admin')
      throw new ForbiddenException('SUPER_ADMIN_PROTECTED');
    const nextRole = input.role === 'none' ? null : input.role;
    if (target.adminRole === nextRole)
      throw new BadRequestException('ROLE_UNCHANGED');

    const updated = await this.users.updateOne(
      { _id: target._id, adminRole: target.adminRole },
      { $set: { adminRole: nextRole }, $inc: { tokenVersion: 1 } },
    );
    if (!updated.modifiedCount)
      throw new ConflictException('ADMIN_ROLE_CHANGED_RETRY');

    await this.audit.record({
      admin,
      action: 'admin.role_change',
      targetType: 'admin',
      targetId,
      targetLabel: target.email,
      changes: { adminRole: { from: target.adminRole, to: nextRole } },
      reason,
      ip,
      userAgent,
    });
    return {
      id: targetId,
      email: target.email,
      role: nextRole,
      sessionsRevoked: true,
    };
  }
}
