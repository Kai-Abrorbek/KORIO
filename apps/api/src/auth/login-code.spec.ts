import * as crypto from 'crypto';
import { resetRedisForTests } from '../common/redis';
import {
  isCodeChallenge,
  issueLoginCode,
  legacyTokenRedirectAllowed,
  redeemLoginCode,
} from './login-code';

const challengeOf = (verifier: string) =>
  crypto.createHash('sha256').update(verifier).digest('base64url');

describe('social login one-time codes (PKCE)', () => {
  const saved = {
    jwt: process.env.JWT_SECRET,
    redis: process.env.REDIS_URL,
    legacy: process.env.OAUTH_LEGACY_TOKEN_REDIRECT,
  };
  // What the app keeps to itself: 32 random bytes as hex.
  const verifier = crypto.randomBytes(32).toString('hex');
  const challenge = challengeOf(verifier);

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret-'.repeat(4);
    delete process.env.REDIS_URL;
    await resetRedisForTests();
  });
  afterAll(() => {
    for (const [key, env] of [
      ['jwt', 'JWT_SECRET'],
      ['redis', 'REDIS_URL'],
      ['legacy', 'OAUTH_LEGACY_TOKEN_REDIRECT'],
    ] as const) {
      if (saved[key] === undefined) delete process.env[env];
      else process.env[env] = saved[key];
    }
  });

  it('turns a code into the user only for the app holding the verifier', async () => {
    expect(isCodeChallenge(challenge)).toBe(true);
    const code = issueLoginCode('user-1', challenge);
    // An app that intercepted the mobile:// redirect has the code, not the verifier.
    await expect(
      redeemLoginCode(code, crypto.randomBytes(32).toString('hex')),
    ).resolves.toBeNull();
    await expect(redeemLoginCode(code, verifier)).resolves.toBe('user-1');
  });

  it('works once', async () => {
    const code = issueLoginCode('user-1', challenge);
    await expect(redeemLoginCode(code, verifier)).resolves.toBe('user-1');
    await expect(redeemLoginCode(code, verifier)).resolves.toBeNull();
  });

  it('refuses forged, altered and expired codes', async () => {
    const code = issueLoginCode('user-1', challenge);
    const [body, mac] = code.split('.');
    const forged = Buffer.from(
      JSON.stringify({
        ...JSON.parse(Buffer.from(body, 'base64url').toString()),
        sub: 'admin',
      }),
    ).toString('base64url');
    await expect(
      redeemLoginCode(`${forged}.${mac}`, verifier),
    ).resolves.toBeNull();
    await expect(redeemLoginCode('garbage', verifier)).resolves.toBeNull();
    await expect(redeemLoginCode(code, 'short')).resolves.toBeNull();

    jest.useFakeTimers({ now: Date.now() + 3 * 60_000 });
    try {
      await expect(redeemLoginCode(code, verifier)).resolves.toBeNull();
    } finally {
      jest.useRealTimers();
    }
  });

  it('keeps sending tokens to old app versions until told not to', () => {
    delete process.env.OAUTH_LEGACY_TOKEN_REDIRECT;
    expect(legacyTokenRedirectAllowed()).toBe(true);
    process.env.OAUTH_LEGACY_TOKEN_REDIRECT = 'false';
    expect(legacyTokenRedirectAllowed()).toBe(false);
  });

  it('only accepts S256 challenges', () => {
    expect(isCodeChallenge('plain-verifier')).toBe(false);
    expect(isCodeChallenge(`${challenge}=`)).toBe(false);
    expect(isCodeChallenge(undefined)).toBe(false);
  });
});
