import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { AdminManageService } from './admin-manage.service';

jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('bcrypt', () => ({ compare: jest.fn() }));

const actorId = '507f1f77bcf86cd799439011';
const targetId = '507f1f77bcf86cd799439012';
const admin = {
  userId: actorId,
  email: 'owner@example.com',
  role: 'super_admin' as const,
};
const input = { role: 'support', password: 'secret', reason: '담당 업무 변경' };

function makeService(targetRole = 'analyst', modifiedCount = 1) {
  const actorQuery = {
    select: jest
      .fn()
      .mockResolvedValue({ adminRole: 'super_admin', adminPassword: 'hash' }),
  };
  const targetQuery = {
    select: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue({
      _id: new Types.ObjectId(targetId),
      email: 'staff@example.com',
      adminRole: targetRole,
    }),
  };
  const users = {
    findById: jest
      .fn()
      .mockReturnValueOnce(actorQuery)
      .mockReturnValueOnce(targetQuery),
    updateOne: jest.fn().mockResolvedValue({ modifiedCount }),
  };
  const audit = { record: jest.fn().mockResolvedValue(undefined) };
  const service = new AdminManageService(users as never, audit as never);
  (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  return { service, users, audit };
}

describe('AdminManageService.changeRole', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns only administrator account fields and the live permission matrix', async () => {
    const rows = [
      {
        _id: new Types.ObjectId(targetId),
        email: 'staff@example.com',
        nickname: 'Staff',
        adminRole: 'analyst',
        adminLastLoginAt: new Date('2026-10-01T00:00:00Z'),
        createdAt: new Date('2026-09-01T00:00:00Z'),
        adminPassword: 'never-return',
      },
    ];
    const query = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue(rows),
    };
    const service = new AdminManageService(
      { find: jest.fn().mockReturnValue(query) } as never,
      {} as never,
    );
    const result = await service.overview();
    expect(result.accounts).toEqual([
      expect.objectContaining({ email: 'staff@example.com', role: 'analyst' }),
    ]);
    expect(result.accounts[0]).not.toHaveProperty('adminPassword');
    expect(
      result.roles.find((item) => item.role === 'analyst')?.permissions,
    ).toContain('analytics:read');
    expect(query.select).toHaveBeenCalledWith(
      'email nickname adminRole adminLastLoginAt createdAt',
    );
  });

  it('rejects self-change and super-admin promotion before querying', async () => {
    const { service, users } = makeService();
    await expect(
      service.changeRole(actorId, input, admin),
    ).rejects.toBeInstanceOf(ForbiddenException);
    await expect(
      service.changeRole(targetId, { ...input, role: 'super_admin' }, admin),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(users.findById).not.toHaveBeenCalled();
  });

  it('requires the current administrator password and records the failed attempt', async () => {
    const { service, users, audit } = makeService();
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(service.changeRole(targetId, input, admin)).rejects.toThrow(
      'REAUTH_FAILED',
    );
    expect(users.updateOne).not.toHaveBeenCalled();
    expect(audit.record).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'admin.role_change',
        success: false,
        errorCode: 'REAUTH_FAILED',
      }),
    );
  });

  it('protects existing super administrators', async () => {
    const { service, users } = makeService('super_admin');
    await expect(service.changeRole(targetId, input, admin)).rejects.toThrow(
      'SUPER_ADMIN_PROTECTED',
    );
    expect(users.updateOne).not.toHaveBeenCalled();
  });

  it('changes the role atomically, revokes sessions, and writes an audit entry', async () => {
    const { service, users, audit } = makeService();
    const result = await service.changeRole(
      targetId,
      input,
      admin,
      '127.0.0.1',
      'test',
    );
    expect(users.updateOne).toHaveBeenCalledWith(
      expect.objectContaining({ adminRole: 'analyst' }),
      { $set: { adminRole: 'support' }, $inc: { tokenVersion: 1 } },
    );
    expect(result.sessionsRevoked).toBe(true);
    expect(audit.record).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'admin.role_change',
        reason: input.reason,
        changes: { adminRole: { from: 'analyst', to: 'support' } },
      }),
    );
  });

  it('reports a concurrent role change instead of overwriting it', async () => {
    const { service, audit } = makeService('analyst', 0);
    await expect(
      service.changeRole(targetId, input, admin),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(audit.record).not.toHaveBeenCalled();
  });
});
