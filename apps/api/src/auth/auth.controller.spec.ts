jest.mock('./auth.service', () => ({ AuthService: class {} }));
jest.mock('./password-reset.service', () => ({
  PasswordResetService: class {},
}));
jest.mock('./signup-verification.service', () => ({
  SignupVerificationService: class {},
}));

import * as crypto from 'crypto';
import type { Response } from 'express';
import { resetRedisForTests } from '../common/redis';
import { AuthController } from './auth.controller';

/** Captures where the controller sends the browser. */
function fakeResponse() {
  const res = {
    location: '',
    redirect(url: string) {
      res.location = url;
      return res;
    },
    status() {
      return res;
    },
    send() {
      return res;
    },
  };
  return res;
}

describe('AuthController social login return', () => {
  const saved = { ...process.env };
  const verifier = crypto.randomBytes(32).toString('hex');
  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');
  const auth = {
    oauthLogin: jest.fn().mockResolvedValue({
      accessToken: 'jwt-for-7-days',
      user: { id: 'user-1' },
    }),
    tokenForUser: jest.fn().mockResolvedValue({ accessToken: 'fresh-jwt' }),
  };
  const controller = new AuthController(
    auth as never,
    {} as never,
    {} as never,
  );

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret-'.repeat(4);
    process.env.KAKAO_REST_API_KEY = 'kakao-key';
    delete process.env.REDIS_URL;
    delete process.env.OAUTH_LEGACY_TOKEN_REDIRECT;
    await resetRedisForTests();
  });
  afterAll(() => {
    process.env = saved;
  });

  async function kakaoLogin(withChallenge: boolean) {
    const start = fakeResponse();
    controller.start(
      'kakao',
      'mobile://auth/social-callback',
      '',
      withChallenge ? challenge : '',
      start as unknown as Response,
    );
    const state = new URL(start.location).searchParams.get('state')!;
    const back = fakeResponse();
    await controller.oauthCallback(
      'kakao',
      'provider-code',
      state,
      back as unknown as Response,
    );
    return new URL(back.location.replace('mobile://', 'https://app/'));
  }

  it('never puts the access token in the app redirect when the app uses PKCE', async () => {
    const back = await kakaoLogin(true);
    expect(back.searchParams.get('token')).toBeNull();
    const loginCode = back.searchParams.get('login_code')!;
    expect(loginCode).toBeTruthy();

    await expect(
      controller.exchangeLoginCode({ loginCode, codeVerifier: verifier }),
    ).resolves.toEqual({ accessToken: 'fresh-jwt' });
    expect(auth.tokenForUser).toHaveBeenCalledWith('user-1');
    // The same code cannot be spent twice.
    await expect(
      controller.exchangeLoginCode({ loginCode, codeVerifier: verifier }),
    ).rejects.toThrow('INVALID_LOGIN_CODE');
  });

  it('serves old app versions until legacy redirects are switched off', async () => {
    expect((await kakaoLogin(false)).searchParams.get('token')).toBe(
      'jwt-for-7-days',
    );
    process.env.OAUTH_LEGACY_TOKEN_REDIRECT = 'false';
    const back = await kakaoLogin(false);
    expect(back.searchParams.get('token')).toBeNull();
    expect(back.searchParams.get('error')).toBe('APP_UPDATE_REQUIRED');
  });
});
