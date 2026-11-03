import * as crypto from 'crypto';
import { jwtSecret } from '../config/secrets';

/**
 * OAuth state.
 *
 * 리다이렉트 주소와 온보딩 세션을 왕복시켜야 하는데, 그냥 쿼리로 넘기면
 * 남이 값을 바꿔 아무 데로나 토큰을 보내게 만들 수 있다(오픈 리다이렉트).
 * 그래서 서명을 붙이고 돌아왔을 때 검증한다.
 */

const secret = () => jwtSecret();

export interface OAuthState {
  redirect: string;
  session?: string;
  /** PKCE code_challenge — 있으면 토큰 대신 일회용 코드로 돌려보낸다 (login-code.ts) */
  cc?: string;
  /** 재사용·지연 공격 방지 */
  ts: number;
}

const sign = (payload: string) =>
  crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

export function packState(state: Omit<OAuthState, 'ts'>): string {
  const payload = Buffer.from(
    JSON.stringify({ ...state, ts: Date.now() }),
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function unpackState(raw?: string): OAuthState | null {
  if (!raw) return null;
  const [payload, mac] = raw.split('.');
  if (!payload || !mac) return null;

  // timingSafeEqual 은 길이가 다르면 던진다
  const expected = sign(payload);
  if (
    mac.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
  ) {
    return null;
  }

  try {
    const state = JSON.parse(
      Buffer.from(payload, 'base64url').toString(),
    ) as OAuthState;
    // 10분이면 로그인하기 충분하다
    if (!state.ts || Date.now() - state.ts > 10 * 60 * 1000) return null;
    return state;
  } catch {
    return null;
  }
}

/**
 * 앱으로 돌아가는 주소만 허용. 외부 URL 로 토큰이 새 나가면 안 된다.
 *
 * exp:// 는 Expo Go(개발용)다. 운영에서 열어 두면 공격자가 자기 Expo 개발 서버
 * 주소(exp://공격자/...)로 redirect 를 건 로그인 링크를 보내, 그 폰에 Expo Go 가
 * 있으면 로그인 직후 토큰을 자기 서버로 받아 갈 수 있다. 개발에서만 받는다.
 */
export function safeRedirect(url?: string): string {
  const fallback = 'mobile://social-auth';
  if (!url) return fallback;
  const schemes =
    process.env.NODE_ENV === 'production' ? 'mobile|korio' : 'mobile|korio|exp';
  return new RegExp(`^(${schemes})://`).test(url) ? url : fallback;
}
