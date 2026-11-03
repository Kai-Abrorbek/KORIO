import * as Linking from "expo-linking";

import api, { ApiError, TokenStorage } from "@/services/api";
import { takeSocialAuthVerifier } from "@/services/social-auth-pkce";
import { UserService, type UserMe } from "@/services/user.service";
import { useAuthStore, type User } from "@/store/auth.store";

export type SocialAuthCallbackPayload = {
  /** 옛 서버(코드 교환 이전)가 주소에 실어 보내던 토큰 */
  token?: string;
  /** 일회용 코드 — verifier 와 같이 보내야 토큰이 된다 (social-auth-pkce.ts) */
  loginCode?: string;
  error?: string;
};

type PendingCompletion = {
  token: string;
  promise: Promise<UserMe>;
};

const CALLBACK_ROUTES = [
  "auth/social-callback",
  "kakao-auth",
  "naver-auth",
  "telegram-auth",
  "social-auth",
] as const;

let stagedCallback: SocialAuthCallbackPayload | null = null;
let pendingCompletion: PendingCompletion | null = null;
/**
 * 안드로이드에선 같은 로그인 주소가 두 길로 들어온다 (브라우저 세션 결과 +
 * 딥링크). 코드는 한 번만 쓸 수 있어서, 두 번째가 따로 교환하면 실패하고
 * 로그인 화면으로 튕긴다. 같은 코드면 같은 교환을 기다리게 한다.
 */
let pendingExchange: { loginCode: string; promise: Promise<string> } | null =
  null;

function firstString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function normalizeSocialAuthError(value?: string): string {
  if (value && /^[A-Z][A-Z0-9_]{0,63}$/.test(value)) {
    return value;
  }

  return "SOCIAL_LOGIN_FAILED";
}

export function parseSocialAuthCallbackUrl(
  url: string,
): SocialAuthCallbackPayload | null {
  try {
    const parsed = Linking.parse(url);
    const scheme = parsed.scheme?.toLowerCase();
    if (scheme && !["mobile", "korio", "exp", "http", "https"].includes(scheme)) {
      return null;
    }

    const route = [parsed.hostname, parsed.path]
      .filter(Boolean)
      .join("/")
      .replace(/^\/+|\/+$/g, "");
    const isSocialCallback = CALLBACK_ROUTES.some(
      (candidate) => route === candidate || route.endsWith("/" + candidate),
    );

    if (!isSocialCallback) {
      return null;
    }

    const token = firstString(parsed.queryParams?.token);
    const loginCode = firstString(parsed.queryParams?.login_code);
    const error = firstString(parsed.queryParams?.error);

    return {
      token: token?.trim() || undefined,
      loginCode: loginCode?.trim() || undefined,
      error: error ? normalizeSocialAuthError(error) : undefined,
    };
  } catch {
    return null;
  }
}

export function stageSocialAuthCallback(
  payload: SocialAuthCallbackPayload,
): void {
  stagedCallback = payload;
}

export function peekStagedSocialAuthCallback(): SocialAuthCallbackPayload | null {
  return stagedCallback;
}

export function clearStagedSocialAuthCallback(
  payload: SocialAuthCallbackPayload | null,
): void {
  if (stagedCallback === payload) {
    stagedCallback = null;
  }
}

export function getSocialAuthDestination(
  user: Pick<UserMe, "isOnboardingCompleted">,
): "/(tabs)" | "/onboarding/survey" {
  return user.isOnboardingCompleted ? "/(tabs)" : "/onboarding/survey";
}

/** 일회용 코드 + verifier → 토큰 */
export function exchangeSocialAuthCode(loginCode: string): Promise<string> {
  if (pendingExchange?.loginCode === loginCode) return pendingExchange.promise;

  const promise = (async () => {
    const codeVerifier = await takeSocialAuthVerifier();
    if (!codeVerifier || !loginCode || loginCode.length > 1024) {
      throw new Error("SOCIAL_LOGIN_FAILED");
    }
    let accessToken: string | undefined;
    try {
      const res = await api.post<{ accessToken: string }>(
        "/auth/oauth/exchange",
        { loginCode, codeVerifier },
      );
      accessToken = res?.accessToken;
    } catch (error) {
      // 만료·이미 쓴 코드(INVALID_LOGIN_CODE)는 유저에겐 그냥 "다시 시도" 다
      const code = error instanceof ApiError ? error.code : "";
      throw new Error(
        code === "TOO_MANY_REQUESTS" ? code : "SOCIAL_LOGIN_FAILED",
      );
    }
    if (!accessToken) throw new Error("SOCIAL_LOGIN_FAILED");
    return accessToken;
  })();

  pendingExchange = { loginCode, promise };
  // 실패하면 비운다. 성공한 건 남겨서 늦게 온 두 번째 길도 같은 토큰을 받는다
  promise.catch(() => {
    if (pendingExchange?.promise === promise) pendingExchange = null;
  });
  return promise;
}

/** 돌아온 주소(토큰이든 코드든)로 로그인을 마친다 */
export async function completeSocialAuthCallback(
  payload: Pick<SocialAuthCallbackPayload, "token" | "loginCode">,
): Promise<UserMe> {
  const token =
    payload.token ??
    (payload.loginCode
      ? await exchangeSocialAuthCode(payload.loginCode)
      : undefined);
  if (!token) throw new Error("SOCIAL_LOGIN_FAILED");
  return completeSocialAuth(token);
}

export async function completeSocialAuth(token: string): Promise<UserMe> {
  const normalizedToken = token.trim();
  if (!normalizedToken || normalizedToken.length > 8192) {
    throw new Error("SOCIAL_LOGIN_FAILED");
  }

  const auth = useAuthStore.getState();
  if (
    auth.accessToken === normalizedToken &&
    auth.user?.isOnboardingCompleted !== undefined
  ) {
    return auth.user as unknown as UserMe;
  }

  if (pendingCompletion?.token === normalizedToken) {
    return pendingCompletion.promise;
  }

  const promise = (async () => {
    await TokenStorage.set(normalizedToken);
    const user = await UserService.getMe();
    useAuthStore
      .getState()
      .setUser(user as unknown as User, normalizedToken);
    return user;
  })();

  pendingCompletion = { token: normalizedToken, promise };

  try {
    return await promise;
  } finally {
    if (pendingCompletion?.promise === promise) {
      pendingCompletion = null;
    }
  }
}
