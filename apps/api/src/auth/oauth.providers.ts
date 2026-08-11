/**
 * 소셜 로그인 제공자 설정.
 *
 * 코드 교환과 프로필 조회를 서버에서 한다. 앱이 직접 하면 client secret 을
 * 앱에 심어야 하고, 그건 디컴파일하면 그대로 털린다.
 *
 * 흐름:
 *   앱 → /auth/{provider}/start → (제공자 로그인) → /auth/{provider}/callback
 *      → 코드 교환 + 프로필 조회 → 유저 생성/조회 → JWT → mobile://... 로 리다이렉트
 */

export type OAuthProviderKey = 'kakao' | 'naver';

/** 제공자가 뭘 주든 우리는 이 모양으로만 쓴다 */
export interface OAuthProfile {
  providerId: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
}

interface OAuthConfig {
  /** 로그인 화면 URL */
  authorizeUrl: string;
  /** 코드 → 액세스 토큰 */
  tokenUrl: string;
  /** 액세스 토큰 → 프로필 */
  profileUrl: string;
  clientId: () => string | undefined;
  clientSecret: () => string | undefined;
  /** 제공자 응답 → OAuthProfile */
  parseProfile: (raw: any) => OAuthProfile;
  /** 추가 authorize 파라미터 */
  extraAuthParams?: Record<string, string>;
}

export const OAUTH: Record<OAuthProviderKey, OAuthConfig> = {
  kakao: {
    authorizeUrl: 'https://kauth.kakao.com/oauth/authorize',
    tokenUrl: 'https://kauth.kakao.com/oauth/token',
    profileUrl: 'https://kapi.kakao.com/v2/user/me',
    clientId: () => process.env.KAKAO_REST_API_KEY,
    clientSecret: () => process.env.KAKAO_CLIENT_SECRET,
    parseProfile: (raw) => {
      const acc = raw?.kakao_account ?? {};
      const prof = acc.profile ?? {};
      return {
        providerId: String(raw?.id ?? ''),
        // 이메일은 동의 항목이라 안 줄 수 있다. 없으면 없는 대로 간다
        email: acc.email || undefined,
        nickname: prof.nickname || undefined,
        profileImage: prof.profile_image_url || undefined,
      };
    },
  },

  naver: {
    authorizeUrl: 'https://nid.naver.com/oauth2.0/authorize',
    tokenUrl: 'https://nid.naver.com/oauth2.0/token',
    profileUrl: 'https://openapi.naver.com/v1/nid/me',
    clientId: () => process.env.NAVER_CLIENT_ID,
    clientSecret: () => process.env.NAVER_CLIENT_SECRET,
    parseProfile: (raw) => {
      const r = raw?.response ?? {};
      return {
        providerId: String(r.id ?? ''),
        email: r.email || undefined,
        nickname: r.nickname || r.name || undefined,
        profileImage: r.profile_image || undefined,
      };
    },
  },
};

/** 콜백 주소. 제공자 콘솔에 등록한 값과 정확히 같아야 한다 */
export const callbackUrl = (provider: string) =>
  `${process.env.PUBLIC_API_URL ?? ''}/auth/${provider}/callback`;
