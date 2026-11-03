jest.mock('../users/schemas/user.schema', () => ({ User: { name: 'User' } }));
jest.mock('./admin-audit.service', () => ({ AdminAuditService: class {} }));
jest.mock('bcrypt', () => {
  const actual = jest.requireActual<typeof import('bcrypt')>('bcrypt');
  return {
    ...actual,
    compare: jest.fn((data: string, hash: string) =>
      actual.compare(data, hash),
    ),
  };
});

import {
  BadRequestException,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { ADMIN_TIMING_DUMMY_HASH } from '../common/timing-dummy-hash';
import { AdminAuthService } from './admin-auth.service';
import { AdminGuard } from './guards/admin.guard';
import { sealTotpSecret, totpAt, totpStep } from './totp';

const ADMIN_SECRET = 'admin-secret-'.repeat(4);
const PASSWORD = 'correct horse battery';
const TOTP = 'JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP';

type Doc = Record<string, unknown> & { _id: Types.ObjectId };

/** Just enough of a Mongoose model for one admin account. */
function fakeUsers(doc: Doc) {
  const copy = () => ({ ...doc });
  const query = () =>
    Object.assign(Promise.resolve(copy()), {
      lean: () => Promise.resolve(copy()),
    });
  const matches = (filter: Record<string, unknown>) => {
    const id = filter._id as Types.ObjectId | undefined;
    if (id && id.toString() !== doc._id.toString()) return false;
    const or = filter.$or as Record<string, unknown>[] | undefined;
    if (!or) return true;
    const last = doc.adminTotpLastStep as number | null | undefined;
    return or.some((cond) => {
      const rule = cond.adminTotpLastStep as null | {
        $exists?: boolean;
        $lt?: number;
      };
      if (rule === null) return last === null;
      if (rule.$exists === false) return last === undefined;
      return last != null && rule.$lt !== undefined && last < rule.$lt;
    });
  };
  return {
    doc,
    findOne: () => ({ select: query }),
    findById: () => ({ select: query }),
    updateOne: (
      filter: Record<string, unknown>,
      update: { $set?: object; $inc?: Record<string, number> },
    ) => {
      if (!matches(filter)) return Promise.resolve({ modifiedCount: 0 });
      Object.assign(doc, update.$set ?? {});
      for (const [key, by] of Object.entries(update.$inc ?? {}))
        doc[key] = ((doc[key] as number | undefined) ?? 0) + by;
      return Promise.resolve({ modifiedCount: 1 });
    },
  };
}

function setup(overrides: Partial<Doc> = {}) {
  const users = fakeUsers({
    _id: new Types.ObjectId(),
    email: 'kai@korio.app',
    nickname: 'Kai',
    adminRole: 'super_admin',
    adminPassword: bcrypt.hashSync(PASSWORD, 4),
    tokenVersion: 0,
    adminTokenVersion: 0,
    adminTotpSecret: null,
    adminTotpLastStep: null,
    ...overrides,
  });
  const jwt = new JwtService({});
  const audit = { record: jest.fn().mockResolvedValue(undefined) };
  const service = new AdminAuthService(jwt, users as never, audit as never);
  const admin = {
    userId: String(users.doc._id),
    email: 'kai@korio.app',
    role: 'super_admin' as const,
  };
  return { users, jwt, service, admin, audit };
}

const codeNow = () => totpAt(TOTP, totpStep());

describe('AdminAuthService', () => {
  const previous = process.env.ADMIN_JWT_SECRET;
  beforeEach(() => {
    process.env.ADMIN_JWT_SECRET = ADMIN_SECRET;
    jest.mocked(bcrypt.compare).mockClear();
  });
  afterAll(() => {
    process.env.ADMIN_JWT_SECRET = previous;
  });

  it('spends a bcrypt check even when the account is not an admin', async () => {
    for (const adminPassword of [null, undefined]) {
      const { service } = setup({ adminPassword, adminRole: null });
      await expect(
        service.login('kai@korio.app', 'guess-guess', '1.2.3.4'),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    }
    // Without this, "not an admin" answers ~250ms faster than "wrong password".
    expect(bcrypt.compare).toHaveBeenCalledTimes(2);
    expect(bcrypt.compare).toHaveBeenLastCalledWith(
      'guess-guess',
      ADMIN_TIMING_DUMMY_HASH,
    );
    await expect(
      bcrypt.compare('anything', ADMIN_TIMING_DUMMY_HASH),
    ).resolves.toBe(false);
  });

  it('asks for the authenticator code once two-factor is on, and takes each code once', async () => {
    const { service } = setup({
      adminTotpSecret: sealTotpSecret(TOTP, ADMIN_SECRET),
    });
    // A saved or leaked password alone no longer opens the console.
    await expect(service.login('kai@korio.app', PASSWORD)).rejects.toThrow(
      'OTP_REQUIRED',
    );
    await expect(
      service.login('kai@korio.app', PASSWORD, undefined, '000000'),
    ).rejects.toThrow('INVALID_OTP');

    const code = codeNow();
    const session = await service.login(
      'kai@korio.app',
      PASSWORD,
      undefined,
      code,
    );
    expect(session.accessToken).toBeTruthy();
    await expect(
      service.login('kai@korio.app', PASSWORD, undefined, code),
    ).rejects.toThrow('INVALID_OTP');
  });

  it('turns two-factor on only after a correct code, and ends other sessions', async () => {
    const { service, users, admin, jwt } = setup();
    await expect(service.beginTwoFactor(admin, 'wrong')).rejects.toThrow(
      BadRequestException,
    );

    const { secret, otpauthUrl } = await service.beginTwoFactor(
      admin,
      PASSWORD,
    );
    expect(otpauthUrl).toContain(`secret=${secret}`);
    // Stored sealed, never as the key the authenticator shows.
    expect(String(users.doc.adminTotpPending)).not.toContain(secret);
    expect(users.doc.adminTotpSecret).toBeNull();

    await expect(service.enableTwoFactor(admin, '000000')).rejects.toThrow(
      'INVALID_OTP',
    );
    const fresh = await service.enableTwoFactor(
      admin,
      totpAt(secret, totpStep()),
    );
    expect(users.doc.adminTotpSecret).toBeTruthy();
    expect(users.doc.adminTokenVersion).toBe(1);
    const payload = jwt.decode<{ atv: number }>(fresh.accessToken);
    expect(payload.atv).toBe(1);
  });

  it('changes the password with the current one (and the code when two-factor is on)', async () => {
    const { service, users, admin } = setup({
      adminTotpSecret: sealTotpSecret(TOTP, ADMIN_SECRET),
    });
    const next = 'a much longer passphrase';
    // Wrong current password is a 400, not a 401 — the console signs out on 401.
    await expect(
      service.changePassword(admin, {
        currentPassword: 'nope',
        newPassword: next,
        otp: codeNow(),
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    await expect(
      service.changePassword(admin, {
        currentPassword: PASSWORD,
        newPassword: next,
      }),
    ).rejects.toThrow('OTP_REQUIRED');

    await service.changePassword(admin, {
      currentPassword: PASSWORD,
      newPassword: next,
      otp: codeNow(),
    });
    await expect(
      bcrypt.compare(next, String(users.doc.adminPassword)),
    ).resolves.toBe(true);
    expect(users.doc.adminTokenVersion).toBe(1);
  });

  it('turns two-factor off only with both the password and a code', async () => {
    const { service, users, admin } = setup({
      adminTotpSecret: sealTotpSecret(TOTP, ADMIN_SECRET),
    });
    await expect(
      service.disableTwoFactor(admin, PASSWORD, '000000'),
    ).rejects.toThrow('INVALID_OTP');
    await expect(
      service.disableTwoFactor(admin, 'nope', codeNow()),
    ).rejects.toThrow('WRONG_PASSWORD');
    await service.disableTwoFactor(admin, PASSWORD, codeNow());
    expect(users.doc.adminTotpSecret).toBeNull();
    expect(users.doc.adminTokenVersion).toBe(1);
  });
});

describe('AdminGuard after a security change', () => {
  it('rejects console tokens issued before the admin token version moved', async () => {
    process.env.ADMIN_JWT_SECRET = ADMIN_SECRET;
    const { service, users, jwt } = setup();
    const before = await service.login('kai@korio.app', PASSWORD);
    users.doc.adminTokenVersion = 1;

    const guard = new AdminGuard(
      { getAllAndOverride: () => undefined } as unknown as Reflector,
      jwt,
      users as never,
    );
    const ctx = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: `Bearer ${before.accessToken}` },
        }),
      }),
      getHandler: () => undefined,
      getClass: () => undefined,
    } as unknown as ExecutionContext;
    await expect(guard.canActivate(ctx)).rejects.toThrow('TOKEN_REVOKED');
  });
});
