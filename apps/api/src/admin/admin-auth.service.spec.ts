jest.mock('../users/schemas/user.schema', () => ({ User: { name: 'User' } }));
jest.mock('bcrypt', () => {
  const actual = jest.requireActual<typeof import('bcrypt')>('bcrypt');
  return {
    ...actual,
    compare: jest.fn((data: string, hash: string) =>
      actual.compare(data, hash),
    ),
  };
});

import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ADMIN_TIMING_DUMMY_HASH } from '../common/timing-dummy-hash';
import { AdminAuthService } from './admin-auth.service';

describe('AdminAuthService.login timing', () => {
  const previous = process.env.ADMIN_JWT_SECRET;
  beforeEach(() => {
    process.env.ADMIN_JWT_SECRET = 'a'.repeat(48);
  });
  afterEach(() => {
    process.env.ADMIN_JWT_SECRET = previous;
    jest.mocked(bcrypt.compare).mockClear();
  });

  function serviceFinding(user: unknown) {
    const userModel = {
      findOne: () => ({ select: () => Promise.resolve(user) }),
    };
    return new AdminAuthService({} as never, userModel as never);
  }

  it('spends a bcrypt check even when the account is not an admin', async () => {
    const compare = jest.mocked(bcrypt.compare);
    for (const user of [null, { email: 'kai@korio.app', adminRole: null }]) {
      await expect(
        serviceFinding(user).login('kai@korio.app', 'guess-guess', '1.2.3.4'),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    }
    // Without this, "not an admin" answers ~250ms faster than "wrong password".
    expect(compare).toHaveBeenCalledTimes(2);
    expect(compare).toHaveBeenLastCalledWith(
      'guess-guess',
      ADMIN_TIMING_DUMMY_HASH,
    );
  });

  it('never accepts the stand-in hash as a password', async () => {
    await expect(
      bcrypt.compare('anything', ADMIN_TIMING_DUMMY_HASH),
    ).resolves.toBe(false);
  });
});
